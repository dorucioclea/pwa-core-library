import type { IHttpService } from '../services/http'
import type { IWalletService } from '../services/wallet'
import type { PreparedTx } from '../features/Transactions/types'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { capitalizeFirstLetter } from '../helpers'
import { handleAppResponse } from '../services/http'
import { showToast } from '../features/Feedback/Toast'
import { getPreparedTxRequest } from '../features/Transactions/api'
import { faHourglassEnd, faHourglassHalf, faHourglassStart } from '@fortawesome/free-solid-svg-icons'
import {
  Address,
  ContractFunction,
  GasLimit,
  SmartContract,
  TypedValue,
  Transaction,
  Balance,
  ChainID,
  NetworkConfig,
  AbiRegistry,
  SmartContractAbi,
  Interaction,
  WalletProvider as WebWalletProvider,
  TransactionPayload,
} from '@elrondnetwork/erdjs'

type ScInfo = {
  address: string
  endpoint: string
  abiUrl?: string
  abiName?: string
}

type TxHooks = {
  onSigned?: (transaction: Transaction) => void
  onSent?: (transaction: Transaction) => void
  onSuccess?: (transaction: Transaction, txOnNetwork: any) => void
  onFailed?: () => void
}

const WebWalletProviderSignedStatus = ['transactionSigned', 'transactionsSigned']

export const usePendingTx = (http: IHttpService, wallet: IWalletService, hooks?: TxHooks) => {
  const router = useRouter()

  useEffect(() => {
    if (wallet.getProviderId() !== 'web' || !WebWalletProviderSignedStatus.includes(router.query.walletProviderStatus as string)) return
    _handleSignedWebWalletTx()
  }, [router.query])

  const buildAndSend = async (receiver: string, value: Balance, gasLimit: number, data?: (networkConfig: NetworkConfig) => TransactionPayload) => {
    const networkConfig = NetworkConfig.getDefault()
    await networkConfig.sync(wallet.getProxy())

    send(
      new Transaction({
        data: data ? data(networkConfig) : undefined,
        gasLimit: new GasLimit(gasLimit),
        receiver: new Address(receiver),
        value: value,
      })
    )
  }

  const sendPrepared = async (preparedTx: PreparedTx) =>
    await send(
      new Transaction({
        sender: Address.fromBech32(preparedTx.sender),
        receiver: Address.fromBech32(preparedTx.receiver),
        value: Balance.fromString(preparedTx.value),
        data: TransactionPayload.fromEncoded(preparedTx.data),
        gasLimit: new GasLimit(preparedTx.gasLimit),
        chainID: new ChainID(preparedTx.chainID),
      })
    )

  const fetchAndSendPrepared = async (preparedTxName: string, args: Record<string, any>) =>
    handleAppResponse(getPreparedTxRequest(http, preparedTxName, args), async (tx) => await sendPrepared(tx))

  const send = async (tx: Transaction) => {
    if (wallet.getProviderId() === 'maiar_extension') {
      showToast('Please confirm in Maiar DeFi Wallet', 'vibe', faHourglassStart)
    } else if (wallet.getProviderId() === 'maiar_app') {
      showToast('Please confirm in Maiar App', 'vibe', faHourglassStart)
    } else if (wallet.getProviderId() === 'hardware') {
      showToast('Please confirm on Ledger', 'vibe', faHourglassStart)
    }

    const signedTx = await _withUIErrorHandling(async () => {
      const _signedTx = await wallet.signTransaction(tx)
      if (wallet.getProviderId() !== 'web') {
        _handleSignedEvent(_signedTx)
      }
      return _signedTx
    })

    if (!!signedTx && wallet.getProviderId() !== 'web') {
      await _sendTxWithFeedback(signedTx)
    }
  }

  const callSc = async (scInfo: ScInfo, args: TypedValue[], gasLimit: number, value?: Balance) => {
    await NetworkConfig.getDefault().sync(wallet.getProxy())
    const { sc, interaction } = await _getScInteraction(scInfo, args)
    const tx = interaction
      .withValue(value || Balance.egld(0))
      .withGasLimit(new GasLimit(gasLimit))
      .buildTransaction()

    await send(tx)
    return sc
  }

  const callScWithEsdt = async (scInfo: ScInfo, value: Balance, args: TypedValue[], gasLimit: number) => {
    await NetworkConfig.getDefault().sync(wallet.getProxy())
    const { sc, interaction } = await _getScInteraction(scInfo, args)
    const tx = interaction
      // TODO: add '.withSingleESDTTransfer(value)' when PR is packed in new npm: https://github.com/ElrondNetwork/elrond-sdk-erdjs/pull/131
      .withGasLimit(new GasLimit(gasLimit))
      .buildTransaction()

    await send(tx)
    return sc
  }

  const _handleSignedWebWalletTx = async () => {
    if (!router.query['chainID[0]'] || !router.query['version[0]']) {
      const networkConfig = NetworkConfig.getDefault()
      await networkConfig.sync(wallet.getProxy())
      router.query['chainID[0]'] = networkConfig.ChainID.valueOf()
      router.query['version[0]'] = networkConfig.MinTransactionVersion.valueOf().toString()
      router.push(router)
    } else {
      const txs = (wallet.getProvider() as WebWalletProvider).getTransactionsFromWalletUrl()
      if (txs.length < 1) return
      router.push(router.asPath.split('?')[0])
      _handleSignedEvent(txs[0])
      await _sendTxWithFeedback(txs[0])
    }
  }

  const _getScInteraction = async (scInfo: ScInfo, args: TypedValue[]) => {
    const hasAbi = scInfo.abiUrl && scInfo.abiName
    const abi = hasAbi ? new SmartContractAbi(await AbiRegistry.load({ urls: [scInfo.abiUrl!] }), [scInfo.abiName!]) : undefined
    const sc = new SmartContract({ address: new Address(scInfo.address), abi: abi })
    const func = new ContractFunction(scInfo.endpoint)
    const interaction = hasAbi ? sc.methods[scInfo.endpoint](args) : new Interaction(sc, func, func, args)
    return { sc, interaction }
  }

  const _sendTxWithFeedback = async (signedTx: Transaction) =>
    _withUIErrorHandling(async () => {
      signedTx.onSent.on(({ transaction }) => _handleSentEvent(transaction))
      const sentTx = await wallet.sendTransaction(signedTx)
      const txOnNetwork = await sentTx.getAsOnNetwork(wallet.getProxy(), true, false, true)

      const contractErrorResults = txOnNetwork
        .getSmartContractResults()
        .getAllResults()
        .filter((result) => !result.isSuccess())

      if (contractErrorResults.length > 0) {
        throw contractErrorResults[0].getReturnMessage()
      }

      _handleSuccessEvent(sentTx, txOnNetwork)
    })

  const _withUIErrorHandling = async <T>(action: () => T) => {
    try {
      return await action()
    } catch (e) {
      console.error(e)
      const message = (e instanceof Error ? e.message : e) as string
      _handleErrorEvent()
      showToast(capitalizeFirstLetter(message), 'error')
    }
  }

  const _handleSignedEvent = (transaction: Transaction) => hooks?.onSigned && hooks.onSigned(transaction)

  const _handleSentEvent = (transaction: Transaction) => {
    hooks?.onSent && hooks.onSent(transaction)
    showToast('Transaction sent ...', 'success', faHourglassHalf)
  }

  const _handleSuccessEvent = (transaction: Transaction, txOnNetwork: any) =>
    hooks?.onSuccess ? hooks.onSuccess(transaction, txOnNetwork) : showToast('Transaction executed', 'success', faHourglassEnd)

  const _handleErrorEvent = () => (hooks?.onFailed ? hooks.onFailed() : showToast('Transaction failed', 'error', faHourglassEnd))

  return { send, buildAndSend, sendPrepared, fetchAndSendPrepared, callSc, callScWithEsdt }
}

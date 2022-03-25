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
import { TransactionOnNetwork } from '@elrondnetwork/erdjs/out/transactionOnNetwork' // not exported

export type ScInfo = {
  address: string
  endpoint: string
  gasLimit?: number
  abiUrl?: string
  abiName?: string
}

type SignedHookParams<M> = { tx: Transaction; scInteraction?: Interaction; meta?: M }
type SentHookParams<M> = { tx: Transaction; scInteraction?: Interaction; meta?: M }
type ErrorHookParams = { tx: Transaction }
type SuccessHookParams<M> = {
  tx: Transaction
  txOnNetwork: TransactionOnNetwork
  scInteraction?: Interaction
  meta?: M
}

export type TxHooks<M> = {
  onSigned?: ({ tx, meta }: SignedHookParams<M>) => void
  onSent?: ({ tx, meta }: SentHookParams<M>) => void
  onFailed?: ({ tx }: ErrorHookParams) => void
  onSuccess?: ({ tx, txOnNetwork, meta }: SuccessHookParams<M>) => void
}

const WebWalletProviderSignedStatus = ['transactionSigned', 'transactionsSigned']

export const usePendingTx = <M = any>(http: IHttpService, wallet: IWalletService, scInfo?: ScInfo, hooks?: TxHooks<M>) => {
  const router = useRouter()

  useEffect(() => {
    if (wallet.getProviderId() !== 'web' || !WebWalletProviderSignedStatus.includes(router.query.walletProviderStatus as string)) return
    _handleSignedWebWalletTx()
  }, [router.query])

  const buildAndSend = async (receiver: string, value: Balance, gasLimit: number, data?: (networkConfig: NetworkConfig) => TransactionPayload) => {
    const networkConfig = NetworkConfig.getDefault()
    await networkConfig.sync(wallet.getProxy())

    await send(
      new Transaction({
        data: data ? data(networkConfig) : undefined,
        gasLimit: new GasLimit(gasLimit),
        receiver: new Address(receiver),
        value: value,
      })
    )
  }

  const sendPrepared = async (preparedTx: PreparedTx, meta?: M) =>
    await send(
      new Transaction({
        sender: Address.fromBech32(preparedTx.sender),
        receiver: Address.fromBech32(preparedTx.receiver),
        value: Balance.fromString(preparedTx.value),
        data: TransactionPayload.fromEncoded(preparedTx.data),
        gasLimit: new GasLimit(preparedTx.gasLimit),
        chainID: new ChainID(preparedTx.chainID),
      }),
      undefined,
      meta
    )

  const fetchAndSendPrepared = async (preparedTxName: string, args: Record<string, any>, meta?: M) =>
    handleAppResponse(getPreparedTxRequest(http, preparedTxName, args), async (tx) => await sendPrepared(tx, meta))

  const send = async (tx: Transaction, scInteraction?: Interaction, meta?: M) => {
    if (wallet.getProviderId() === 'maiar_extension') {
      showToast('Please confirm in Maiar DeFi Wallet', 'vibe', { icon: faHourglassStart })
    } else if (wallet.getProviderId() === 'maiar_app') {
      showToast('Please confirm in Maiar App', 'vibe', { icon: faHourglassStart })
    } else if (wallet.getProviderId() === 'hardware') {
      showToast('Please confirm on Ledger', 'vibe', { icon: faHourglassStart })
    }

    const signedTx = await _withUIErrorHandling(tx, async () => {
      const _signedTx = await wallet.signTransaction(tx)
      if (wallet.getProviderId() !== 'web') {
        _handleSignedEvent(_signedTx, scInteraction)
      }
      return _signedTx
    })

    if (!!signedTx && wallet.getProviderId() !== 'web') {
      await _sendTxWithFeedback(signedTx, scInteraction, meta)
    }
  }

  const callSc = async (value: Balance, args: TypedValue[], estimatedExecutionComponent?: number) => {
    if (!scInfo) return null
    await NetworkConfig.getDefault().sync(wallet.getProxy())
    const interaction = await _getScInteraction(scInfo, args)
    interaction.withValue(value)

    if (estimatedExecutionComponent) {
      interaction.withGasLimitComponents({ estimatedExecutionComponent })
    }

    if (scInfo.gasLimit) {
      interaction.withGasLimit(new GasLimit(scInfo.gasLimit))
    }

    await send(interaction.buildTransaction(), interaction)
    return interaction
  }

  const callScWithEsdt = async (esdtValue: Balance, args: TypedValue[], estimatedExecutionComponent?: number) => {
    if (!scInfo) return null
    await NetworkConfig.getDefault().sync(wallet.getProxy())
    const interaction = await _getScInteraction(scInfo, args)
    interaction.withSingleESDTTransfer(esdtValue)

    if (estimatedExecutionComponent) {
      interaction.withGasLimitComponents({ estimatedExecutionComponent })
    }

    if (scInfo.gasLimit) {
      interaction.withGasLimit(new GasLimit(scInfo.gasLimit))
    }

    await send(interaction.buildTransaction(), interaction)
    return interaction
  }

  const callScCustom = async (builder: (interaction: Interaction) => Interaction, args: TypedValue[]) => {
    if (!scInfo) return null
    await NetworkConfig.getDefault().sync(wallet.getProxy())
    const interaction = await _getScInteraction(scInfo, args)

    if (scInfo.gasLimit) {
      interaction.withGasLimit(new GasLimit(scInfo.gasLimit))
    }

    builder(interaction)

    await send(interaction.buildTransaction(), interaction)
    return interaction
  }

  const _handleSignedWebWalletTx = async () => {
    if (!router.query['chainID[0]'] || !router.query['version[0]']) {
      // the web wallet sign-transaction hook currently is missing 'chainID' & 'version'
      // in the callback query params. this is a workaround to add them ourselves for now.
      const networkConfig = NetworkConfig.getDefault()
      await networkConfig.sync(wallet.getProxy())
      router.query['chainID[0]'] = networkConfig.ChainID.valueOf()
      router.query['version[0]'] = networkConfig.MinTransactionVersion.valueOf().toString()
      router.push(router)
    } else {
      const txs = (wallet.getProvider() as WebWalletProvider).getTransactionsFromWalletUrl()
      if (txs.length < 1) return
      router.push(router.asPath.split('?')[0])
      const scInteraction = !!scInfo ? await _getScInteraction(scInfo, []) : undefined
      _handleSignedEvent(txs[0], scInteraction)
      await _sendTxWithFeedback(txs[0], scInteraction)
    }
  }

  const _getScInteraction = async (info: ScInfo, args: TypedValue[]) => {
    const hasAbi = info.abiUrl && info.abiName
    const abi = hasAbi ? new SmartContractAbi(await AbiRegistry.load({ urls: [info.abiUrl!] }), [info.abiName!]) : undefined
    const sc = new SmartContract({ address: new Address(info.address), abi: abi })
    const func = new ContractFunction(info.endpoint)
    return hasAbi ? sc.methods[info.endpoint](args) : new Interaction(sc, func, func, args)
  }

  const _sendTxWithFeedback = async (signedTx: Transaction, scInteraction?: Interaction, meta?: M) =>
    _withUIErrorHandling(signedTx, async () => {
      signedTx.onSent.on(({ transaction }) => _handleSentEvent(transaction, scInteraction, meta))
      const sentTx = await wallet.sendTransaction(signedTx)
      const txOnNetwork = await sentTx.getAsOnNetwork(wallet.getProxy(), true, false, true)

      // there is currently a bug in erdjs where SC returnCode (returnCode.ts) isSuccess() returns false
      // if results contain transfers like of ESDT:
      // https://github.com/ElrondNetwork/elrond-sdk-erdjs/blob/12a772f2b56872455e54876fee44ea9c6167238a/src/smartcontracts/returnCode.ts#L45
      const contractErrorResults = txOnNetwork
        .getSmartContractResults()
        .getAllResults()
        // .filter((result) => !result.isSuccess()) comment this line back in when bug is fixed
        .filter((result) => result.getReturnMessage() && !result.getReturnMessage().includes('too much gas provided')) // remove this when bug fixed

      if (contractErrorResults.length > 0) {
        throw contractErrorResults[0].getReturnMessage()
      }

      _handleSuccessEvent(sentTx, txOnNetwork, scInteraction, meta)
    })

  const _withUIErrorHandling = async <T>(tx: Transaction, action: () => T) => {
    try {
      return await action()
    } catch (e) {
      console.error(e)
      const message = (e instanceof Error ? e.message : e) as string
      _handleErrorEvent(tx)
      showToast(capitalizeFirstLetter(message), 'error')
    }
  }

  const getTxExplorerUrl = (tx: Transaction) => `${wallet.getConfig().Explorer}/transactions/${tx.getHash()}`

  const _handleSignedEvent = (tx: Transaction, scInteraction?: Interaction, meta?: M) =>
    hooks?.onSigned && hooks.onSigned({ tx, scInteraction, meta })

  const _handleSentEvent = (tx: Transaction, scInteraction?: Interaction, meta?: M) => {
    hooks?.onSent && hooks.onSent({ tx, scInteraction, meta })
    showToast('Transaction sent ...', 'success', { icon: faHourglassHalf, href: getTxExplorerUrl(tx) })
  }

  const _handleSuccessEvent = (tx: Transaction, txOnNetwork: TransactionOnNetwork, scInteraction?: Interaction, meta?: M) =>
    hooks?.onSuccess
      ? hooks.onSuccess({ tx, txOnNetwork, scInteraction, meta })
      : showToast('Transaction executed', 'success', { icon: faHourglassEnd, href: getTxExplorerUrl(tx) })

  const _handleErrorEvent = (tx: Transaction) =>
    hooks?.onFailed ? hooks.onFailed({ tx }) : showToast('Transaction failed', 'error', { icon: faHourglassEnd, href: getTxExplorerUrl(tx) })

  return { send, buildAndSend, sendPrepared, fetchAndSendPrepared, callSc, callScWithEsdt, callScCustom }
}

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
  Transaction,
  AbiRegistry,
  Interaction,
  TokenPayment,
  SmartContract,
  SmartContractAbi,
  ContractFunction,
  TransactionWatcher,
  TransactionPayload,
  ITransactionOnNetwork,
} from '@elrondnetwork/erdjs'

export type ScInfo = {
  address: string
  endpoint: string
  gasLimit: number
  abiUrl?: string
  abiName?: string
}

type SignedHookParams<M> = { tx: Transaction; scInteraction?: Interaction; meta?: M }
type SentHookParams<M> = { tx: Transaction; scInteraction?: Interaction; meta?: M }
type ErrorHookParams = { tx: Transaction }
type SuccessHookParams<M> = {
  tx: Transaction
  txOnNetwork: ITransactionOnNetwork
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

  const sendWithPayload = async (receiver: string, payment: TokenPayment, gasLimit: number, data: TransactionPayload) =>
    await send(
      new Transaction({
        data: data,
        gasLimit: gasLimit,
        receiver: new Address(receiver),
        value: payment,
        chainID: wallet.getConfig().ChainId,
      })
    )

  const sendPrepared = async (preparedTx: PreparedTx, meta?: M) =>
    await send(
      new Transaction({
        sender: Address.fromBech32(preparedTx.sender),
        receiver: Address.fromBech32(preparedTx.receiver),
        value: TokenPayment.egldFromBigInteger(preparedTx.value),
        data: TransactionPayload.fromEncoded(preparedTx.data),
        gasLimit: preparedTx.gasLimit,
        chainID: preparedTx.chainID,
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

  const callSc = async (payment: TokenPayment, args: any[]) => {
    if (!scInfo) return null
    const interaction = await _getScInteraction(scInfo, args)
    interaction.withValue(payment).withChainID(wallet.getConfig().ChainId).withGasLimit(scInfo.gasLimit)

    await send(interaction.buildTransaction(), interaction)
    return interaction
  }

  const callScWithEsdt = async (esdtPayment: TokenPayment, args: any[]) => {
    if (!scInfo) return null
    const interaction = await _getScInteraction(scInfo, args)
    interaction.withSingleESDTTransfer(esdtPayment).withChainID(wallet.getConfig().ChainId).withGasLimit(scInfo.gasLimit)

    await send(interaction.buildTransaction(), interaction)
    return interaction
  }

  const callScCustom = async (builder: (interaction: Interaction) => Interaction, args: any[]) => {
    if (!scInfo) return null
    const interaction = await _getScInteraction(scInfo, args)
    interaction.withChainID(wallet.getConfig().ChainId).withGasLimit(scInfo.gasLimit)

    builder(interaction)

    await send(interaction.buildTransaction(), interaction)
    return interaction
  }

  const _handleSignedWebWalletTx = async () => {
    // TODO: implement web wallet
    // const txs = (wallet.getProvider() as WebWalletProvider).getTransactionsFromWalletUrl()
    // if (txs.length < 1) return
    // router.push(router.asPath.split('?')[0])
    // const scInteraction = !!scInfo ? await _getScInteraction(scInfo, []) : undefined
    // _handleSignedEvent(txs[0], scInteraction)
    // await _sendTxWithFeedback(txs[0], scInteraction)
  }

  const _getScInteraction = async (info: ScInfo, args: any[]) => {
    if (!info.abiUrl || !info.abiName) {
      const sc = new SmartContract({ address: new Address(info.address) })
      return new Interaction(sc, new ContractFunction(info.endpoint), args)
    }

    const abiRes = await fetch(info.abiUrl!)
    const registry = AbiRegistry.create(await abiRes.json())
    const abi = new SmartContractAbi(registry, [info.abiName!])
    const sc = new SmartContract({ address: new Address(info.address), abi })

    return sc.methods[info.endpoint](args)
  }

  const _sendTxWithFeedback = async (signedTx: Transaction, scInteraction?: Interaction, meta?: M) =>
    _withUIErrorHandling(signedTx, async () => {
      await wallet.sendTransaction(signedTx)

      _handleSentEvent(signedTx, scInteraction, meta)

      const watcher = new TransactionWatcher(wallet.getNetworkProvider())
      const txOnNetwork = await watcher.awaitCompleted(signedTx)

      const contractErrorResults = txOnNetwork.contractResults.items.filter(
        (result) => result.returnMessage && !result.returnMessage.includes('too much gas provided')
      )

      if (contractErrorResults.length > 0) {
        throw contractErrorResults[0].returnMessage
      }

      _handleSuccessEvent(signedTx, txOnNetwork, scInteraction, meta)
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

  const _handleSuccessEvent = (tx: Transaction, txOnNetwork: ITransactionOnNetwork, scInteraction?: Interaction, meta?: M) =>
    hooks?.onSuccess
      ? hooks.onSuccess({ tx, txOnNetwork, scInteraction, meta })
      : showToast('Transaction executed', 'success', { icon: faHourglassEnd, href: getTxExplorerUrl(tx) })

  const _handleErrorEvent = (tx: Transaction) =>
    hooks?.onFailed ? hooks.onFailed({ tx }) : showToast('Transaction failed', 'error', { icon: faHourglassEnd, href: getTxExplorerUrl(tx) })

  return { send, sendWithPayload, sendPrepared, fetchAndSendPrepared, callSc, callScWithEsdt, callScCustom }
}

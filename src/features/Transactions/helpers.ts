import { faHourglassEnd, faHourglassHalf, faHourglassStart } from '@fortawesome/free-solid-svg-icons'
import { IWalletService } from '../../services/wallet'
import { showToast } from '../Feedback/Toast'
import { PreparedTx } from './types'
import {
  Address,
  ContractFunction,
  GasLimit,
  SmartContract,
  TypedValue,
  Transaction,
  TransactionPayload,
  Balance,
  ChainID,
} from '@elrondnetwork/erdjs'

type TxHooks = {
  onSigned?: (transaction: Transaction) => void
  onSent?: (transaction: Transaction) => void
  onSuccess?: (transaction: Transaction) => void
  onFailed?: (transaction: Transaction) => void
}

export const callSmartContract = async (
  walletService: IWalletService,
  contractAddress: string,
  func: string,
  args: TypedValue[],
  gasLimit: number,
  hooks?: TxHooks
) => {
  const sc = new SmartContract({ address: new Address(contractAddress) })
  const tx = sc.call({
    func: new ContractFunction(func),
    gasLimit: new GasLimit(gasLimit),
    args: args,
  })

  await sendTx(walletService, tx, hooks)
}

export const sendPreparedTx = async (walletService: IWalletService, prepared: PreparedTx, hooks?: TxHooks) => {
  const tx = new Transaction({
    sender: Address.fromBech32(prepared.sender),
    receiver: Address.fromBech32(prepared.receiver),
    value: Balance.fromString(prepared.value),
    data: TransactionPayload.fromEncoded(prepared.data),
    gasLimit: new GasLimit(prepared.gasLimit),
    chainID: new ChainID(prepared.chainID),
  })

  await sendTx(walletService, tx, hooks)
}

const sendTx = async (walletService: IWalletService, tx: Transaction, hooks?: TxHooks) => {
  if (walletService.getProviderId() === 'maiar_extension') {
    showToast('Please confirm on Maiar Extension', 'vibe', faHourglassStart)
  } else if (walletService.getProviderId() === 'maiar_app') {
    showToast('Please confirm on Maiar', 'vibe', faHourglassStart)
  } else if (walletService.getProviderId() === 'hardware') {
    showToast('Please confirm on Ledger', 'vibe', faHourglassStart)
  }

  const handleSignedEvent = (transaction: Transaction) => hooks?.onSigned && hooks.onSigned(transaction)

  const handleSentEvent = (transaction: Transaction) => {
    hooks?.onSent && hooks.onSent(transaction)
    showToast('Transaction sent ...', 'success', faHourglassHalf)
  }

  const handleSuccessEvent = (transaction: Transaction) =>
    hooks?.onSuccess ? hooks.onSuccess(transaction) : showToast('Transaction executed', 'success', faHourglassEnd)

  const handleErrorEvent = (transaction: Transaction) =>
    hooks?.onFailed ? hooks.onFailed(transaction) : showToast('Transaction failed', 'error', faHourglassEnd)

  try {
    const signedTx = await walletService.signTransaction(tx) // providers might manipulate (remove) registered listeners, so register them after signing

    signedTx.onSigned.on(({ transaction }) => handleSignedEvent(transaction))
    signedTx.onSent.on(({ transaction }) => handleSentEvent(transaction))
    signedTx.onStatusChanged.on(({ transaction }) => transaction.getStatus().isSuccessful() && handleSuccessEvent(transaction))
    signedTx.onStatusChanged.on(({ transaction }) => transaction.getStatus().isFailed() && handleErrorEvent(transaction))

    await walletService.sendTransaction(signedTx)
  } catch (e) {
    console.error(e)
    showToast(e as string, 'error')
  }
}
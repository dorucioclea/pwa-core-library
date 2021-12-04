import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
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
  if (walletService.providerId === 'maiar_extension') {
    showToast('Please confirm on Maiar Extension', 'vibe', faHourglassHalf)
  } else if (walletService.providerId === 'maiar_app') {
    showToast('Please confirm on Maiar', 'vibe', faHourglassHalf)
  } else if (walletService.providerId === 'hardware') {
    showToast('Please confirm on Ledger', 'vibe', faHourglassHalf)
  }

  tx.onSigned.on(({ transaction }) => hooks?.onSigned && hooks.onSigned(transaction))
  tx.onSent.on(({ transaction }) => hooks?.onSent && hooks.onSent(transaction))
  tx.onStatusChanged.on(({ transaction }) => hooks?.onSuccess && transaction.getStatus().isSuccessful() && hooks.onSuccess(transaction))
  tx.onStatusChanged.on(({ transaction }) => hooks?.onFailed && transaction.getStatus().isFailed() && hooks.onFailed(transaction))

  try {
    await walletService.sendTransaction(tx)
  } catch (e) {
    showToast(e as string, 'error')
  }
}

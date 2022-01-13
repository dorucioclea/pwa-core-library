export type TransactionType = 'ESDTNFTCreate' | 'ESDTNFTTransfer'

export type Transaction = {
  type: TransactionType
  hash: string
  gasLimit: number | null
  gasPrice: number | null
  gasUsed: number | null
  miniBlockHash: string
  nonce: number
  receiver: string
  receiverShard: number | null
  sender: string
  senderShard: string | null
  signature: string | null
  status: 'success' | 'pending' | 'fail'
  value: string
  fee: string | null
  timestamp: number | null
  time: string | null
  data: string | null
  tokenIdentifier: string | null
  tokenValue: string | null
}

export type PreparedTx = {
  sender: string
  receiver: string
  value: string
  data: string
  gasLimit: number
  chainID: string
}

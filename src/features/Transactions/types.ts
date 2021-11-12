export type TransactionType = 'nft_create' | 'nft_transfer'

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

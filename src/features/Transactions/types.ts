export type Transaction = {
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
  status: string
  value: string
  fee: string | null
  timestamp: number | null
  data: string | null
  tokenIdentifier: string | null
  tokenValue: string | null
}

import { ChainID, Token } from '@elrondnetwork/erdjs'
import { TokenType } from './types'

export const getTokenTypeDisplayName = (tokenType: TokenType) => {
  if (tokenType === 'NonFungibleESDT') return 'NFT'
  if (tokenType === 'SemiFungibleESDT') return 'SFT'
  if (tokenType === 'MetaESDT') return 'META'
  return 'ESDT'
}

export const getSuperToken = (chainId: ChainID): Token => {
  if (chainId.valueOf() === 'D') return new Token({ identifier: 'XSUPER-d0da40', name: 'XSUPER', decimals: 0 })
  if (chainId.valueOf() === 'T') return new Token({ identifier: 'XSUPER-d99d09', name: 'XSUPER', decimals: 0 })
  return new Token({ identifier: 'SUPER-507aa6', name: 'SUPER', decimals: 0 })
}

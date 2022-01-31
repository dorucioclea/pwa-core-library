import { ChainID, Token } from '@elrondnetwork/erdjs'
import { TokenType } from './types'

export const getTokenTypeDisplayName = (tokenType: TokenType) => {
  if (tokenType === 'NonFungibleESDT') return 'NFT'
  if (tokenType === 'SemiFungibleESDT') return 'SFT'
  if (tokenType === 'MetaESDT') return 'META'
  return 'ESDT'
}

export const getSuperToken = (chainId: ChainID): Token => {
  if (chainId.valueOf() === 'D') return new Token({ identifier: 'XSUPER-d0da40', name: 'XSuper', decimals: 0 })
  if (chainId.valueOf() === 'T') return new Token({ identifier: 'XSUPER-34d9ea', name: 'XSuper', decimals: 0 })
  return new Token({ identifier: 'SUPER-764d8d', name: 'Super', decimals: 0 })
}

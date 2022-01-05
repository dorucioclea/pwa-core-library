import { ChainID, Token } from '@elrondnetwork/erdjs'

export const getTokenTypeDisplayName = (tokenType: string) => {
  if (tokenType === 'NonFungibleESDT') return 'NFT'
  if (tokenType === 'SemiFungibleESDT') return 'SFT'
  return 'ESDT'
}

export const getSuperToken = (chainId: ChainID): Token => {
  if (chainId.valueOf() === 'D') return new Token({ identifier: 'XSUPER-d0da40', name: 'XSuper', decimals: 0 })
  if (chainId.valueOf() === 'T') return new Token({ identifier: 'XSUPER-34d9ea', name: 'XSuper', decimals: 0 })
  return new Token({ identifier: 'SUPER-764d8d', name: 'Super', decimals: 0 })
}

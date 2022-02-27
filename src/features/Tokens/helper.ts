import { TokenType } from './types'

export const getTokenTypeDisplayName = (tokenType: TokenType) => {
  if (tokenType === 'NonFungibleESDT') return 'NFT'
  if (tokenType === 'SemiFungibleESDT') return 'SFT'
  if (tokenType === 'MetaESDT') return 'META'
  return 'ESDT'
}

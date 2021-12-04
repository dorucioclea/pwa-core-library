export const getTokenTypeDisplayName = (tokenType: string) => {
  if (tokenType === 'NonFungibleESDT') return 'NFT'
  if (tokenType === 'SemiFungibleESDT') return 'SFT'
  return 'ESDT'
}

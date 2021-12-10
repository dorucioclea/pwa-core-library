import { Token } from '@elrondnetwork/erdjs'
import { getBlockchainNetworkFromId } from '../../helpers'

export const getTokenTypeDisplayName = (tokenType: string) => {
  if (tokenType === 'NonFungibleESDT') return 'NFT'
  if (tokenType === 'SemiFungibleESDT') return 'SFT'
  return 'ESDT'
}

export const getSuperToken = (networkId: string): Token => {
  const network = getBlockchainNetworkFromId(networkId)
  if (network === 'devnet') return new Token({ identifier: 'XSUPER-d0da40', name: 'xSuper', decimals: 0 })
  if (network === 'testnet') return new Token({ identifier: 'XSUPER-72a15d', name: 'xSuper', decimals: 0 })
  return new Token({ identifier: 'SUPER-764d8d', name: 'Super', decimals: 0 })
}

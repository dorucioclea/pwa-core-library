type CollectionTokenIdentifier = string
type TokenIdentifier = string

export type Nft = {
  identifier: TokenIdentifier
  collection: string
  nonce: number
  type: string
  name: string
  creator: string
  ticker: string
  royalties: number | null
  url: string
  thumbnailUrl: string
  owner: string
  supply: number
  tags: string[]
  description: string | null
}

export type NftCollection = Nft[]
export type NftCollectionList = Record<CollectionTokenIdentifier, NftCollection>

export type TokenType = 'FungibleESDT' | 'NonFungibleESDT' | 'SemiFungibleESDT' | 'MetaESDT'

export type NftCollectionAccount = {
  collection: string
  type: TokenType
  name: string
  ticker: string
  canFreeze: boolean
  canWipe: boolean
  canPause: boolean
  canTransferRole: boolean
  canCreate: boolean
  canBurn: boolean
}

export type IssuableCollection = {
  type: TokenType
  name: string
  ticker: string
  properties: string[]
}

export type SettableCollectionRoles = {
  collection: string
  address: string
  roles: string[]
}

export type CollectionSettableProperty = {
  id: 'canFreeze' | 'canWipe' | 'canPause' | 'canTransferNFTCreateRole' | 'canChangeOwner' | 'canUpgrade' | 'canAddSpecialRoles'
  name: string
  description: string
}

export type MintableNft = {
  collection: string
  name: string
  description: string
  royalties: number
  tags: string[]
  quantity: number
  media: File
}

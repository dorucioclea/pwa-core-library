type CollectionTokenIdentifier = string
type TokenIdentifier = string

export type Nft = {
  collection: string
  type: string
  identifier: TokenIdentifier
  name: string
  creator: string
  url: string
  thumbnailUrl: string
  tags: string[]
}

export type NftCollection = Nft[]
export type NftCollectionList = Record<CollectionTokenIdentifier, NftCollection>

export type NftCollectionAccount = {
  collection: string
  type: string
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
  type: 'nft' | 'sft' | 'meta'
  name: string
  ticker: string
  properties: string[]
}

export type SettableCollectionRoles = {
  collection: string
  address: string
  roles: string[]
}

export type MintableNft = {
  collection: string
  name: string
  description: string
  royalties: number
  tags: string[]
  media: File
}

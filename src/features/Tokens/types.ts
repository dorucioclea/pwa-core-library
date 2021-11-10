export type CollectionTokenIdentifier = string
export type TokenIdentifier = string

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

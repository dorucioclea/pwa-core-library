import React from 'react'
import { NftMinter } from './NftMinter'
import { Steps } from '../Progress/Steps'
import { _NftCollectionSelector } from './_NftCollectionSelector'
import { TxProcessingIndicatorOverlay } from '../Transactions/TxProcessingIndicatorOverlay'
import { IssuableCollection, MintableNft, NftCollectionRole, CollectionSettableProperty, SettableCollectionRoles } from './types'

type Props = {
  address: string
  collection: NftCollectionRole | null
  availableCollections: NftCollectionRole[]
  onCollectionSelected: (collection: NftCollectionRole | null) => void
  onCollectionCreateRequest: (issuableCollection: IssuableCollection) => void
  onCollectionSetRolesRequest: (settableCollectionRoles: SettableCollectionRoles) => void
  onNftCreateRequest: (mintableNft: MintableNft) => void
  onResetRequest: () => void
  mintingNotice?: any
  collectionSettableProperties?: CollectionSettableProperty[]
  processing: boolean
  loading: boolean
}

export const NftCreator = (props: Props) => (
  <div className="relative">
    {props.processing && <TxProcessingIndicatorOverlay />}
    <header className="absolute md:relative flex justify-end md:justify-center w-full">
      <Steps total={3} active={props.collection ? 2 : 1} />
    </header>
    {props.collection && props.collection.canCreate ? (
      <NftMinter
        collection={props.collection}
        onCreateRequest={props.onNftCreateRequest}
        onGoBackRequest={() => props.onCollectionSelected(null)}
        notice={props.mintingNotice}
      />
    ) : (
      <_NftCollectionSelector
        address={props.address}
        collection={props.collection}
        availableCollections={props.availableCollections}
        creatorSettableProperties={props.collectionSettableProperties}
        onSelected={(c) => props.onCollectionSelected(c)}
        onCreateRequest={props.onCollectionCreateRequest}
        onSetRolesRequest={props.onCollectionSetRolesRequest}
        onResetRequest={props.onResetRequest}
        loading={props.loading}
      />
    )}
  </div>
)

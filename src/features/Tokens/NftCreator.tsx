import React from 'react'
import _NftCollectionSelector from './_NftCollectionSelector'
import _NftMinter from './_NftMinter'
import { TxProcessingIndicator } from '../Transactions/TxProcessingIndicator'
import { IssuableCollection, MintableNft, NftCollectionAccount, SettableCollectionRoles } from './types'
import { Steps } from '../Progress/Steps'

type Props = {
  address: string
  collection: NftCollectionAccount | null
  availableCollections: NftCollectionAccount[]
  onCollectionSelected: (collection: NftCollectionAccount | null) => void
  onCollectionCreateRequest: (issuableCollection: IssuableCollection) => void
  onCollectionSetRolesRequest: (settableCollectionRoles: SettableCollectionRoles) => void
  onNftCreateRequest: (mintableNft: MintableNft) => void
  onResetRequest: () => void
  processing: boolean
}

export const NftCreator = (props: Props) => (
  <div className="relative">
    {props.processing && (
      <div className="absolute z-50 inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center -mt-2">
        <TxProcessingIndicator className="mb-8" />
        <p className="text-gray-800 text-2xl animate-pulse">Processing your transaction on the blockchain ...</p>
      </div>
    )}
    <header className="mb-4 flex justify-center">
      <Steps total={3} active={props.collection ? 2 : 1} />
    </header>
    {props.collection && props.collection.canCreate ? (
      <_NftMinter collection={props.collection} onCreateRequest={props.onNftCreateRequest} onGoBackRequest={() => props.onCollectionSelected(null)} />
    ) : (
      <_NftCollectionSelector
        address={props.address}
        collection={props.collection}
        availableCollections={props.availableCollections}
        onSelected={(c) => props.onCollectionSelected(c)}
        onCreateRequest={props.onCollectionCreateRequest}
        onSetRolesRequest={props.onCollectionSetRolesRequest}
        onResetRequest={props.onResetRequest}
      />
    )}
  </div>
)

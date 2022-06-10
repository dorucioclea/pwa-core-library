import React, { useState } from 'react'
import _NftCollectionCreator from './_NftCollectionCreator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { NftCollectionRoleSetter } from './_NftCollectionRoleSetter'
import { IssuableCollection, NftCollectionAccount, CollectionSettableProperty, SettableCollectionRoles } from './types'
import { Select, SelectOption } from '../Controls/Select'
import { Button } from '../Controls/Button'
import { getTokenTypeDisplayName } from './helper'
import { EllipsisLoader } from '../Loaders/EllipsisLoader'

type Props = {
  address: string
  collection: NftCollectionAccount | null
  availableCollections: NftCollectionAccount[]
  onSelected: (NftCollectionAccount: NftCollectionAccount) => void
  onCreateRequest: (issuableCollection: IssuableCollection) => void
  onSetRolesRequest: (settableRoles: SettableCollectionRoles) => void
  onResetRequest: () => void
  creatorSettableProperties?: CollectionSettableProperty[]
  loading: boolean
}

export const _NftCollectionSelector = (props: Props) => {
  const [isCreating, setIsCreating] = useState(false)
  const hasNoCollections = !props.loading && props.availableCollections.length < 1

  const handleCreation = (issuableCollection: IssuableCollection) => {
    props.onCreateRequest(issuableCollection)
    setIsCreating(false)
  }

  const toSelectOptions = (col: NftCollectionAccount[]) =>
    col.map((c) => ({ name: `(${getTokenTypeDisplayName(c.type)}) ${c.name} (${c.ticker})`, value: c.ticker } as SelectOption))

  const findCollectionBy = (ticker: string) => props.availableCollections.find((c) => c.ticker === ticker)!

  if (isCreating) {
    return (
      <_NftCollectionCreator
        onCreated={handleCreation}
        onGoBackRequest={() => setIsCreating(false)}
        settableProperties={props.creatorSettableProperties}
      />
    )
  }

  if (props.collection) {
    return (
      <NftCollectionRoleSetter
        collection={props.collection}
        presetAddress={props.address}
        onSetRoles={props.onSetRolesRequest}
        onGoBackRequest={props.onResetRequest}
      />
    )
  }

  return (
    <div>
      <h2 className="mb-4">
        <span className="highlight">Select</span> a collection
      </h2>
      {hasNoCollections ? (
        <p className="text-xl md:text-2xl text-center py-8">
          You don't own any collections yet, please create one first.
          <br />
          <br />
          NFTs must be minted inside a collection.
        </p>
      ) : (
        <div className="flex items-center relative h-32">
          {props.loading ? (
            <EllipsisLoader className="block mx-auto w-10 text-primary-500" />
          ) : (
            <Select
              onSelect={(ticker) => ticker && props.onSelected(findCollectionBy(ticker))}
              options={[{ name: 'Choose collection ...' }, ...toSelectOptions(props.availableCollections)]}
              className="mb-8"
            />
          )}
        </div>
      )}
      <div className="flex flex-wrap md:flex-nowrap items-center">
        {!hasNoCollections && <span className="block font-head text-2xl md:text-right mr-8 w-full md:w-1/2 mb-4 md:mb-0">or create a </span>}
        <Button color="blue" onClick={() => setIsCreating(true)} className={hasNoCollections ? 'w-full' : 'w-full md:w-1/2'}>
          New Collection
          <FontAwesomeIcon icon={faPlusCircle} className="inline-block ml-2 text-white opacity-75" />
        </Button>
      </div>
    </div>
  )
}

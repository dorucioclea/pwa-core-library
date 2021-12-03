import React, { useState } from 'react'
import _NftCollectionCreator from './_NftCollectionCreator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { NftCollectionRoleSetter } from './_NftCollectionRoleSetter'
import { IssuableCollection, NftCollectionAccount, SettableCollectionRoles } from './types'
import { Select, SelectOption } from '../Controls/Select'
import { Button } from '../Controls/Button'

type Props = {
  address: string
  collection: NftCollectionAccount | null
  availableCollections: NftCollectionAccount[]
  onSelected: (NftCollectionAccount: NftCollectionAccount) => void
  onCreateRequest: (issuableCollection: IssuableCollection) => void
  onSetRolesRequest: (settableRoles: SettableCollectionRoles) => void
  onResetRequest: () => void
}

const _NftCollectionSelector = (props: Props) => {
  const [isCreating, setIsCreating] = useState(false)

  const handleCreation = (issuableCollection: IssuableCollection) => {
    props.onCreateRequest(issuableCollection)
    setIsCreating(false)
  }

  const toSelectOptions = (col: NftCollectionAccount[]) =>
    col.map((c) => ({ name: `(${c.type}) ${c.name} (${c.ticker})`, value: c.ticker } as SelectOption))

  const findCollectionBy = (ticker: string) => props.availableCollections.find((c) => c.ticker === ticker)!

  if (isCreating) {
    return <_NftCollectionCreator onCreated={handleCreation} onGoBackRequest={() => setIsCreating(false)} />
  }

  if (props.collection && !props.collection.canCreate) {
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
        <span className="highlight">Select</span> an NFT collection
      </h2>
      <div className="h-32">
        <Select
          onSelect={(ticker) => ticker && props.onSelected(findCollectionBy(ticker))}
          options={[{ name: 'Choose collection ...' }, ...toSelectOptions(props.availableCollections)]}
          className="mb-8"
        />
      </div>
      <div className="flex items-center">
        <span className="block font-head text-2xl text-right mr-8 w-1/2">or create a </span>
        <Button color="blue" onClick={() => setIsCreating(true)} className="w-1/2">
          New Collection
          <FontAwesomeIcon icon={faPlusCircle} className="inline-block ml-2 text-white opacity-75" />
        </Button>
      </div>
    </div>
  )
}

export default _NftCollectionSelector

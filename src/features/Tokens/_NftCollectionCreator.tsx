import React, { SyntheticEvent, useState } from 'react'
import { faAngleLeft, faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '../Controls/Input'
import { Button } from '../Controls/Button'
import { IssuableCollection } from './types'
import { IssueEdstCost } from '../../constants'
import { Alert } from '../Alerts/Alert'
import { sanitizeAlphanumeric } from '../../helpers'

type Props = {
  onCreated: (issuableCollection: IssuableCollection) => void
  onGoBackRequest: () => void
}

type OptionalProperty = {
  id: string
  name: string
  description: string
}

const OptionalProperties: OptionalProperty[] = [
  {
    id: 'canFreeze',
    name: 'Freezable',
    description: 'Ability to freeze the collection (for regulatory reasons)',
  },
  { id: 'canWipe', name: 'Wipeable', description: 'Ability to wipe frozen accounts (for regulatory reasons)' },
  { id: 'canPause', name: 'Pauseable', description: 'Ability to pause transfers (for regulatory reasons)' },
  {
    id: 'canTransferNFTCreateRole',
    name: 'Transferable Create Role',
    description: 'Ability to transfer the creator role to another account',
  },
]

const _NftCollectionCreator = (props: Props) => {
  const [name, setName] = useState('')
  const [ticker, setTicker] = useState('')
  const [properties, setProperties] = useState<string[]>([])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    props.onCreated({ type: 'nft', name, ticker, properties })
    setName('')
    setTicker('')
    setProperties([])
  }

  const handlePropertyChange = (id: string, checked: boolean) =>
    checked ? setProperties((current) => current.filter((p) => p === id)) : setProperties((current) => [...current, id])

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4">
        <span className="highlight">Create</span> a collection
      </h2>
      <Alert icon={faCoins} type="warning">
        Issuing a collection <strong>costs {IssueEdstCost} EGLD</strong>, which is defined by the network.
      </Alert>
      <label htmlFor="name" className="pl-1 text-xl mb-2 text-gray-800">
        Name
      </label>
      <Input id="name" minLength={3} maxLength={20} value={name} onChange={(val) => setName(sanitizeAlphanumeric(val))} className="mb-4" />
      <label htmlFor="ticker" className="pl-1 text-xl mb-2 text-gray-800">
        Ticker
      </label>
      <Input
        id="ticker"
        minLength={3}
        maxLength={10}
        value={ticker}
        onChange={(val) => setTicker(sanitizeAlphanumeric(val).toUpperCase())}
        className="mb-8"
      />
      <div className="mb-8">
        {OptionalProperties.map((property) => (
          <div key={property.id} className="relative flex items-start mb-2">
            <div className="flex items-center h-5">
              <input
                id={property.id}
                aria-describedby={property.id + '-description'}
                type="checkbox"
                onChange={(e) => handlePropertyChange(property.id, e.target.checked)}
                className="focus:ring-indigo-500 h-6 w-6 text-indigo-600 border-gray-300 rounded-xl"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={property.id} className="font-medium text-gray-700 text-lg">
                {property.name} ({property.id})
              </label>
              <p id={property.id + '-description'} className="text-sm md:text-base text-gray-500">
                {property.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <button onClick={() => props.onGoBackRequest()} className="w-1/3 md:w-1/2 text-lg md:text-xl text-center text-gray-500">
          <FontAwesomeIcon icon={faAngleLeft} className="text-gray-500 opacity-75 inline-block mr-2" />
          Go Back
        </button>
        <Button color="blue" className="w-2/3 md:w-1/2" submit>
          Create Collection
        </Button>
      </div>
    </form>
  )
}

export default _NftCollectionCreator

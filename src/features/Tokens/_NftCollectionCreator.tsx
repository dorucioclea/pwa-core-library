import React, { SyntheticEvent, useState } from 'react'
import { faAngleLeft, faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '../Controls/Input'
import { Alert } from '../Alerts/Alert'
import { Constants } from '../../constants'
import { Button } from '../Controls/Button'
import { sanitizeAlphanumeric } from '../../helpers'
import { RadioGroup, RadioGroupItem } from '../Controls/RadioGroup'
import { IssuableCollection, CollectionSettableProperty, TokenType } from './types'

const DefaultSettableProperties = ['canUpgrade', 'canAddSpecialRoles']

const CollectionTypes: RadioGroupItem[] = [
  { id: 'NonFungibleESDT' as TokenType, title: 'NFT', tip: 'Non-fungible Token - All pieces are unique and only exist once', default: true },
  { id: 'SemiFungibleESDT' as TokenType, title: 'SFT', tip: 'Semi-fungible Token - Pieces can have a supply of more than one' },
]

type Props = {
  settableProperties?: CollectionSettableProperty[]
  onCreated: (issuableCollection: IssuableCollection) => void
  onGoBackRequest: () => void
}

const _NftCollectionCreator = (props: Props) => {
  const hasConfiguredSettableProperties = props.settableProperties && props.settableProperties.length > 0
  const defaultTypeState = CollectionTypes.find((i) => i.default)?.id as TokenType
  const [name, setName] = useState('')
  const [ticker, setTicker] = useState('')
  const [type, setType] = useState<TokenType>(defaultTypeState || 'NonFungibleESDT')
  const [properties, setProperties] = useState<string[]>(hasConfiguredSettableProperties ? [] : DefaultSettableProperties)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    props.onCreated({ type: type, name, ticker, properties })
    setName('')
    setTicker('')
    setProperties([])
  }

  const handlePropertyChange = (id: string, checked: boolean) =>
    checked ? setProperties((current) => [...current, id]) : setProperties((current) => current.filter((p) => p !== id))

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-4">
        <span className="highlight">Create</span> a collection
      </h2>
      <Alert icon={faCoins} type="warning">
        Issuing a collection <strong>costs {Constants.NetworkCosts.IssueEsdt} EGLD</strong>, which is defined by the network.
      </Alert>
      <label htmlFor="name" className="pl-1 text-xl mb-4 text-gray-800">
        Name
      </label>
      <Input id="name" minLength={3} maxLength={20} value={name} onChange={(val) => setName(sanitizeAlphanumeric(val))} className="mb-4" required />
      <label htmlFor="ticker" className="pl-1 text-xl mb-2 text-gray-800">
        Ticker
      </label>
      <Input
        id="ticker"
        minLength={3}
        maxLength={10}
        value={ticker}
        onChange={(val) => setTicker(sanitizeAlphanumeric(val).toUpperCase())}
        className="mb-4"
        required
      />
      <label className="block pl-1 text-xl mb-2 text-gray-800">Type</label>
      <RadioGroup items={CollectionTypes} onChange={(activeId) => setType(activeId as TokenType)} tipPlace="right" className="pl-2 mb-4" />
      {hasConfiguredSettableProperties ? (
        <div className="mb-8">
          {props.settableProperties!.map((property) => (
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
      ) : (
        <p className="text-gray-500 text-lg md:text-xl mb-8 pl-1">
          This collection will be <strong>upgradable</strong> in the future.
        </p>
      )}
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

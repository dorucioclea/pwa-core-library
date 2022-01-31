import React from 'react'
import { faAngleRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SyntheticEvent, useState } from 'react'
import { NftCollectionAccount, SettableCollectionRoles, TokenType } from './types'
import { showToast } from '../Feedback/Toast'
import { Input } from '../Controls/Input'
import { Switch } from '../Controls/Switch'
import { Button } from '../Controls/Button'

type Props = {
  collection: NftCollectionAccount
  presetAddress: string
  onSetRoles: (settableCollectionRoles: SettableCollectionRoles) => void
  onGoBackRequest: () => void
}

type SettableRole = {
  id: string
  name: string
  description: string
  default?: boolean
  required?: boolean
  hide?: boolean
}

const GetSettableRoles = (collectionType: TokenType): SettableRole[] => [
  {
    id: 'ESDTRoleNFTCreate',
    name: 'Create',
    description: 'Allows the given address to CREATE in that collection.',
    required: true,
  },
  {
    id: 'ESDTRoleNFTBurn',
    name: 'Burn',
    description: 'Allows the given address to BURN in that collection.',
  },
  {
    id: 'ESDTRoleNFTAddQuantity',
    name: 'Add Quantity',
    description: 'Allows the given address to ADD QUANTITY to SFTs in that collection.',
    default: true,
    hide: collectionType !== 'SemiFungibleESDT',
  },
]

export const NftCollectionRoleSetter = (props: Props) => {
  const activeRoles = GetSettableRoles(props.collection.type).filter((r) => !r.hide)
  const defaultRolesState = activeRoles.filter((r) => r.required || r.default).map((r) => r.id)
  const [address, setAddress] = useState(props.presetAddress || '')
  const [roles, setRoles] = useState<string[]>(defaultRolesState)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    props.onSetRoles({
      collection: props.collection.ticker,
      address,
      roles,
    })
  }

  const toggleRole = (role: SettableRole) => {
    if (role.required) {
      showToast('This setting can not be changed.', 'warning')
      return
    }
    setRoles((current) => (current.includes(role.id) ? current.filter((r) => r !== role.id) : [...current, role.id]))
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <h2 className="mb-1">
        Permissions for
        <span className="inline-block ml-2 text-blue-500">{props.collection.ticker.split('-')[0]}</span>
        <span className="text-gray-400 text-xl">{'-' + props.collection.ticker.split('-')[1]}</span>
      </h2>
      <p className="text-xl mb-8">Roles define what the given address can do with the collection.</p>
      <label htmlFor="address" className="pl-2 text-gray-600 text-lg mb-1">
        Setting roles for (your address)
      </label>
      <Input id="address" value={address} onChange={(val) => !props.presetAddress && setAddress(val)} disabled className="mb-4" />
      <ul className="p-4">
        {activeRoles.map((settable) => (
          <li key={settable.id} className="flex items-center mb-8">
            <Switch label={settable.name} checked={roles.includes(settable.id)} onChange={() => toggleRole(settable)} />
            <div className="pl-4">
              <h3>{settable.name}</h3>
              <p>{settable.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <button onClick={() => props.onGoBackRequest()} type="button" className="w-20 text-xl text-center text-gray-500">
          <FontAwesomeIcon icon={faTimes} className="text-gray-500 opacity-75 inline-block mr-2" />
          <span className="sr-only">Close</span>
        </button>
        <Button color="blue" className="flex-grow" submit>
          Continue
          <FontAwesomeIcon icon={faAngleRight} className="inline-block ml-2 text-white opacity-75" />
        </Button>
      </div>
    </form>
  )
}

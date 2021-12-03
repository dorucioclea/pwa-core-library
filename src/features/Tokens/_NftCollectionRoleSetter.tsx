import React from 'react'
import { faAngleRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SyntheticEvent, useState } from 'react'
import { NftCollectionAccount, SettableCollectionRoles } from './types'
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
  required?: boolean
}

const SettableRoles: SettableRole[] = [
  {
    id: 'ESDTRoleNFTCreate',
    name: 'Create',
    description: 'Allows the given address to CREATE NFTs for that collection.',
    required: true,
  },
  {
    id: 'ESDTRoleNFTBurn',
    name: 'Burn',
    description: 'Allows the given address to BURN NFTs in that collection.',
  },
]

export const NftCollectionRoleSetter = (props: Props) => {
  const [address, setAddress] = useState(props.presetAddress || '')
  const [roles, setRoles] = useState<string[]>(SettableRoles.filter((r) => r.required).map((r) => r.id))

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
    <form onSubmit={handleSubmit}>
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
        {SettableRoles.map((settable) => (
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

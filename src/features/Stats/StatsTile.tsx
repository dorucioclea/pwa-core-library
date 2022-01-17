import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppSystemColor } from '../../types'

type Props = {
  name: string
  description?: string
  icon: IconProp
  value: string | number
  color?: AppSystemColor
  className?: string
}

export const StatsTile = (props: Props) => {
  const getBackgroundCssColorClassName = () => {
    if (props.color === 'blue') return 'bg-blue-500'
    if (props.color === 'red') return 'bg-red-500'
    if (props.color === 'yellow') return 'bg-yellow-500'
    if (props.color === 'green') return 'bg-green-500'
    if (props.color === 'indigo') return 'bg-indigo-500'
    if (props.color === 'gray') return 'bg-gray-500'
    if (props.color === 'black') return 'bg-black'
    if (props.color === 'purple') return 'bg-purple-500'
    if (props.color === 'pink') return 'bg-pink-500'
    return 'bg-primary-500'
  }

  return (
    <div className={`relative bg-white p-6 rounded-lg overflow-hidden ${props.className || ''}`}>
      <div>
        <div className={`absolute rounded-lg h-10 w-10 m-2 flex justify-center items-center ${getBackgroundCssColorClassName()}`}>
          <FontAwesomeIcon icon={props.icon} size="lg" className="text-white" />
        </div>
        <p className="ml-16 text-lg md:text-xl font-medium text-gray-500 truncate">{props.name}</p>
      </div>
      <p className="ml-16 text-2xl font-semibold text-gray-900">{props.value}</p>
      {!!props.description && <p className="text-lg text-gray-400">{props.description}</p>}
    </div>
  )
}

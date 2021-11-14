import React, { InputHTMLAttributes } from 'react'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IntersectProps } from '../../types'

const DefaultClassNames =
  'flex block w-full bg-gray-200 border-gray-300 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500 leading-normal text-xl rounded-xl transition duration-300'

export type SelectOption = {
  name: string
  value?: string
}

type Props = {
  options: SelectOption[]
  onSelect: (value: string) => void
  className?: string
}

export const Select = (props: IntersectProps<InputHTMLAttributes<HTMLSelectElement>, Props>) => (
  <div className={`${DefaultClassNames} ${props.className || ''}`}>
    <span className="flex justify-center items-center w-12">
      <FontAwesomeIcon icon={faAngleDown} className="text-gray-800" />
    </span>
    <select onChange={(e) => props.onSelect(e.target.value)} className="block h-12 bg-transparent appearance-none w-full focus:outline-none">
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
)

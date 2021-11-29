import React, { ChangeEvent, InputHTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { IntersectProps } from '../../types'
import { classNames } from '../..'

type Props = {
  onChange: (value: string) => void
  icon?: IconDefinition
  pre?: string
  className?: string
}

const DefaultClassNames =
  'focus:outline-none border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 bg-gray-200 w-full appearance-none leading-normal block px-4 py-2 text-xl rounded-xl transition duration-300'

export const Input = (props: IntersectProps<InputHTMLAttributes<HTMLInputElement>, Props>) =>
  !!props.icon || !!props.pre ? (
    <div className={props.className}>
      <div className="relative">
        <div className="pointer-events-none flex items-center absolute inset-y-0 left-0 pl-3">
          {props.icon && <FontAwesomeIcon icon={props.icon} className="text-gray-600" />}
          {props.pre && <span className="font-head text-gray-600">{props.pre}</span>}
        </div>
        <input
          {...props}
          onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
          className={classNames(DefaultClassNames, props.className, props.pre ? 'pl-16' : 'pl-10')}
        />
      </div>
    </div>
  ) : (
    <input
      {...props}
      onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
      className={`${DefaultClassNames} ${props.className}`}
    />
  )

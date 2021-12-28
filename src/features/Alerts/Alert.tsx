import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNames } from '../../helpers'

type Props = {
  children: any
  icon?: IconProp
  type?: 'info' | 'warning' | 'error' | 'success'
  className?: string
}

export const Alert = (props: Props) => {
  const getBackgroundColorClassNames = () => {
    if (props.type === 'warning') return 'bg-yellow-100'
    if (props.type === 'error') return 'bg-red-100'
    if (props.type === 'success') return 'bg-green-100'
    return 'bg-blue-100'
  }

  const getIconColorClassNames = () => {
    if (props.type === 'warning') return 'text-yellow-500'
    if (props.type === 'error') return 'text-red-500'
    if (props.type === 'success') return 'text-green-500'
    return 'text-blue-500'
  }

  const getTextColorClassNames = () => {
    if (props.type === 'warning') return 'text-yellow-700'
    if (props.type === 'error') return 'text-red-700'
    if (props.type === 'success') return 'text-green-700'
    return 'text-blue-700'
  }

  return (
    <div className={classNames('rounded-xl px-4 py-2 md:py-3 mb-4', getBackgroundColorClassNames(), props.className)}>
      <div className="flex items-center">
        {props.icon && (
          <div className="flex-shrink-0 mr-3">
            <FontAwesomeIcon icon={props.icon} className={getIconColorClassNames()} />
          </div>
        )}
        <div className="flex-1 md:flex md:justify-between">
          <p className={classNames('text-base sm:text-lg xl:text-xl', getTextColorClassNames())}>{props.children}</p>
        </div>
      </div>
    </div>
  )
}

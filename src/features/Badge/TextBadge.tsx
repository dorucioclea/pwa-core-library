import React from 'react'
import { classNames } from '../../helpers'
import { AppSystemColor } from '../../types'

interface IProps {
  children: string
  color?: AppSystemColor
  className?: string
}

export const TextBadge = (props: IProps) => {
  const getBgColorClassName = () => {
    if (props.color === 'green') return 'bg-green-100 text-green-800'
    if (props.color === 'blue') return 'bg-blue-100 text-blue-800'
    if (props.color === 'red') return 'bg-red-100 text-red-800'
    if (props.color === 'yellow') return 'bg-yellow-100 text-yellow-800'
    return 'bg-primary-100 text-primary-800'
  }

  return (
    <span className={classNames('inline-flex items-center px-3 py-1 rounded-lg font-medium', getBgColorClassName(), props.className)}>
      {props.children}
    </span>
  )
}

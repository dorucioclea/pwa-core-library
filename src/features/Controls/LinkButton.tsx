import React, { CSSProperties } from 'react'
import { EllipsisLoader } from '../Loaders/EllipsisLoader'
import { AppSystemColor } from '../../types'
import { getButtonBgColorClassName } from './helpers'

type Props = {
  children: any
  href: string
  color?: AppSystemColor
  disabled?: boolean
  submit?: boolean
  loading?: boolean
  className?: string
  style?: CSSProperties
}

export const LinkButton = (props: Props) => {
  const baseClassNames = 'relative inline-flex justify-center items-center py-2 px-6 rounded-xl shadow text-xl text-white'
  const stateClassNames = 'hover:shadow-lg focus:outline-none focus:shadow-outline focus:shadow-none'

  return (
    <a
      href={props.href}
      className={`${baseClassNames} ${getButtonBgColorClassName(props.color, props.disabled)} ${stateClassNames}`}
      style={{ transition: 'all .2s ease-in', ...(props.style || {}) }}
    >
      {!props.loading ? props.children : <span className="opacity-25">{props.children}</span>}
      {props.loading && <EllipsisLoader className="absolute w-10" />}
    </a>
  )
}

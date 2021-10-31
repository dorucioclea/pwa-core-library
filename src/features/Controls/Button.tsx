import React, { CSSProperties } from 'react'
import { AppSystemColor } from '../../types'
import { EllipsisLoader } from '../Loaders/EllipsisLoader'
import { getButtonBgColorClassName } from './helpers'

type Props = {
  children: any
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  color?: AppSystemColor
  disabled?: boolean
  submit?: boolean
  loading?: boolean
  className?: string
  style?: CSSProperties
}

export const Button = (props: Props) => {
  const baseClassNames = 'relative inline-flex justify-center items-center py-2 px-6 rounded-xl shadow text-xl text-white transition duration-300'
  const stateClassNames = 'hover:shadow-lg focus:outline-none focus:shadow-outline focus:shadow-none'

  return (
    <button
      onClick={(e) => props.onClick && props.onClick(e)}
      disabled={props.disabled || props.loading || undefined}
      type={props.submit ? 'submit' : 'button'}
      className={`${baseClassNames} ${getButtonBgColorClassName(props.color, props.disabled)} ${stateClassNames} ${props.className || ''}`}
      style={props.style}
    >
      {!props.loading ? props.children : <span className="opacity-25">{props.children}</span>}
      {props.loading && <EllipsisLoader className="absolute w-10" />}
    </button>
  )
}

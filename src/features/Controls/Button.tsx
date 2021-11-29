import React, { CSSProperties, SyntheticEvent } from 'react'
import { classNames } from '../../helpers'
import { AppSystemColor } from '../../types'
import { EllipsisLoader } from '../Loaders/EllipsisLoader'
import { getButtonBgColorClassName } from './helpers'

type Props = {
  children: any
  onClick?: (e: SyntheticEvent) => void
  color?: AppSystemColor
  disabled?: boolean
  submit?: boolean
  loading?: boolean
  large?: boolean
  className?: string
  style?: CSSProperties
}

export const Button = (props: Props) => {
  const baseClassNames = 'relative inline-flex justify-center items-center shadow text-white transition duration-300'
  const stateClassNames = 'hover:shadow-lg focus:outline-none focus:shadow-outline focus:shadow-none'
  const sizingClassNames = props.large ? 'text-2xl px-8 py-4 rounded-3xl' : 'text-xl px-6 py-2 rounded-xl'

  return (
    <button
      onClick={(e) => props.onClick && props.onClick(e)}
      disabled={props.disabled || props.loading || undefined}
      type={props.submit ? 'submit' : 'button'}
      className={classNames(
        baseClassNames,
        getButtonBgColorClassName(props.color, props.disabled),
        stateClassNames,
        sizingClassNames,
        props.className
      )}
      style={props.style}
    >
      {!props.loading ? props.children : <span className="opacity-25">{props.children}</span>}
      {props.loading && <EllipsisLoader className="absolute w-10" />}
    </button>
  )
}

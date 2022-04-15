import Link from 'next/link'
import { classNames } from '../../helpers'
import { AppSystemColor } from '../../types'
import React, { CSSProperties } from 'react'
import { getButtonColorClassNames } from './helpers'
import { EllipsisLoader } from '../Loaders/EllipsisLoader'

type Props = {
  children: any
  href: string
  as?: string
  color?: AppSystemColor
  disabled?: boolean
  submit?: boolean
  loading?: boolean
  large?: boolean
  inverted?: boolean
  className?: string
  style?: CSSProperties
}

export const LinkButton = (props: Props) => {
  const baseClassNames = 'relative inline-flex justify-center items-center transition duration-300'
  const stateClassNames = 'hover:shadow-lg focus:outline-none focus:shadow-outline focus:shadow-none'
  const sizingClassNames = props.large ? 'text-2xl px-8 py-4 rounded-3xl' : 'text-xl px-6 py-2 rounded-xl'

  const className = classNames(
    baseClassNames,
    getButtonColorClassNames(props.color, props.disabled, props.inverted),
    stateClassNames,
    sizingClassNames,
    props.inverted ? '' : 'shadow',
    props.className
  )

  const Content = () => (
    <>
      {!props.loading ? props.children : <span className="opacity-25">{props.children}</span>}
      {props.loading && <EllipsisLoader className="absolute w-10" />}
    </>
  )

  return props.href.startsWith('http') ? (
    <a href={props.href} target="_blank" className={className}>
      <Content />
    </a>
  ) : (
    <Link href={props.href} as={props.as}>
      <a className={className}>
        <Content />
      </a>
    </Link>
  )
}

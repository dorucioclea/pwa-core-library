import React from 'react'
import Link from 'next/link'
import { NavigationItem } from './types'

export const _NavigationItem = (props: NavigationItem) => {
  const className = 'items-center flex-col pt-4 md:justify-center md:pt-0 md:flex text-gray-500 text-xl hover:text-primary-500 hover:no-underline'
  const style = { transition: 'all .2s ease-in' }
  const tooltip = props.soon ? 'coming soon' : undefined

  return props.href.startsWith('http') ? (
    <a data-tip={tooltip} href={props.href} target="_blank" rel="noopener" className={className} style={style}>
      {props.text}
    </a>
  ) : (
    <Link href={props.href} as={props.as}>
      <a data-tip={tooltip} className={className} style={style}>
        {props.text}
      </a>
    </Link>
  )
}

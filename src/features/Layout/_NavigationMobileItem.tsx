import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavigationItem } from './types'

export const _NavigationMobileItem = (item: NavigationItem) => {
  const className = 'flex items-center justify-center w-full h-full text-gray-400 active:text-primary-400'

  const content = (
    <>
      {item.icon && <FontAwesomeIcon icon={item.icon} size="lg" />}
      <span className="sr-only">{item.text}</span>
    </>
  )

  return item.href.startsWith('http') ? (
    <a href={item.href} target="_blank" rel="noopener" className={className}>
      {content}
    </a>
  ) : (
    <Link href={item.href} as={item.as}>
      <a className={className}>{content}</a>
    </Link>
  )
}

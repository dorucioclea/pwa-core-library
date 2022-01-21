import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavigationItem } from './types'
import { Tooltip } from '../Feedback/Tooltip'
import { classNames } from '../../helpers'

export const _NavigationMobileItem = (props: NavigationItem) => {
  const router = useRouter()
  const tooltip = props.soon ? 'coming soon' : undefined
  const href = props.soon ? '#' : props.href
  const isActive = router.pathname === href

  const className = classNames(
    'flex items-center justify-center w-full h-full active:text-primary-400',
    isActive ? 'text-primary-400' : 'text-gray-400'
  )

  const content = (
    <>
      {props.icon && <FontAwesomeIcon icon={props.icon} size="lg" />}
      <span className="sr-only">{props.text}</span>
    </>
  )

  return (
    <Tooltip tip={tooltip}>
      {props.href.startsWith('http') ? (
        <a href={href} target="_blank" rel="noopener" className={className}>
          {content}
        </a>
      ) : (
        <Link href={href} as={props.as}>
          <a className={className}>{content}</a>
        </Link>
      )}
    </Tooltip>
  )
}

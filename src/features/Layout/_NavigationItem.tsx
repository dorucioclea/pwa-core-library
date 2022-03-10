import React from 'react'
import Link from 'next/link'
import { NavigationItem } from './types'
import { Tooltip } from '../Feedback/Tooltip'
import { useRouter } from 'next/router'
import { classNames } from '../../helpers'

export const _NavigationItem = (props: NavigationItem) => {
  const router = useRouter()
  const style = { transition: 'all .2s ease-in' }
  const tooltip = props.soon ? 'coming soon' : undefined
  const href = props.soon ? '#' : props.href
  const isActive = router?.pathname === href

  const className = classNames(
    'items-center flex-col pt-4 md:justify-center md:pt-0 md:flex text-xl hover:text-primary-500 hover:no-underline',
    isActive ? 'text-primary-500' : 'text-gray-500'
  )

  return (
    <Tooltip tip={tooltip}>
      {props.href.startsWith('http') ? (
        <a href={href} target="_blank" rel="noopener" className={className} style={style}>
          {props.text}
        </a>
      ) : (
        <Link href={href} as={props.as}>
          <a className={className} style={style}>
            {props.text}
          </a>
        </Link>
      )}
    </Tooltip>
  )
}

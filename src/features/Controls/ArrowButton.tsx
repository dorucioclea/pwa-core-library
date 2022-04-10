import React from 'react'
import Link from 'next/link'
import { classNames } from '../../helpers'
import { AppSystemColor } from '../../types'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  children: string
  icon: IconProp
  iconColor?: AppSystemColor
  color: AppSystemColor
  direction?: 'right' | 'down'
  badge?: number | string
  badgeColor?: AppSystemColor
  badgeTextColor?: string
  href?: string
  onClick?: () => void
  inverted?: boolean
  className?: string
}

export const ArrowButton = (props: IProps) => {
  const arrowIcon = props.direction === 'down' ? faAngleDown : faAngleRight

  const backgroundColorClassName = props.inverted ? `bg-${props.color}-500 hover:bg-${props.color}-600` : 'bg-gray-50 hover:bg-gray-100'
  const arrowColorClassName = props.inverted ? 'text-white' : 'text-gray-600'
  const iconContainerBgColorClassName = props.inverted ? 'bg-white bg-opacity-25' : `bg-${props.color}-500`
  const badgeBgColorClassName = props.inverted ? 'bg-white bg-opacity-25' : `bg-${props.badgeColor || 'primary'}-500`
  const badgeTextColorClassName = props.inverted ? 'text-white' : `text-${props.badgeTextColor || 'gray'}-500`

  const content = (
    <div className={classNames('flex items-center px-4 py-2 w-full rounded-lg transition duration-300', backgroundColorClassName)}>
      <div className={classNames('mr-4 flex justify-center items-center w-8 h-8 rounded-full', iconContainerBgColorClassName)}>
        <FontAwesomeIcon icon={props.icon} className="" style={{ color: props.iconColor || '#fff' }} />
      </div>
      <div className="flex-grow flex items-center">
        <span className="text-base" style={{ color: props.inverted ? '#fff' : undefined, letterSpacing: 0.25 }}>
          {props.children}
        </span>
        {!!props.badge && (
          <div className={classNames('ml-2 px-2 py-1 -mb-1 rounded-lg', badgeBgColorClassName)}>
            <span className={classNames('font-bold', badgeTextColorClassName)}>{props.badge}</span>
          </div>
        )}
      </div>
      <div>
        <FontAwesomeIcon icon={arrowIcon} className={classNames('text-2xl', arrowColorClassName)} />
      </div>
    </div>
  )

  return props.href ? (
    <Link href={props.href}>
      <a className={classNames('block w-full', props.className)}>{content}</a>
    </Link>
  ) : (
    <button onClick={props.onClick} className={classNames('block w-full', props.className)}>
      {content}
    </button>
  )
}

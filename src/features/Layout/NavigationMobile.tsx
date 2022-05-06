import React from 'react'
import { NavigationItem } from './types'
import { classNames } from '../../helpers'
import { _NavigationMobileItem } from './_NavigationMobileItem'

type Navigation = {
  items: NavigationItem[]
  className?: string
}

export const NavigationMobile = (props: Navigation) => (
  <nav
    className={classNames(
      'fixed bottom-0 left-0 right-0 flex-grow bg-white rounded-t-lg md:hidden shadow-inner border-t border-gray-100',
      props.className
    )}
    style={{ zIndex: 999 }}
  >
    <ul className="flex h-20">
      {props.items.map((item, index) => (
        <li key={index} className="relative flex items-center justify-center flex-1">
          <_NavigationMobileItem {...item} />
        </li>
      ))}
    </ul>
  </nav>
)

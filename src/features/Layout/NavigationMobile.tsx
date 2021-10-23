import React from 'react'
import { NavigationItem } from './types'
import { _NavigationMobileItem } from './_NavigationMobileItem'

type Navigation = {
  items: NavigationItem[]
  className?: string
}

export const NavigationMobile = (props: Navigation) => (
  <nav className={`fixed bottom-0 left-0 right-0 flex-grow z-50 pb-6 bg-white rounded-t-lg md:hidden ${props.className || ''}`}>
    <ul className="flex h-16">
      {props.items.map((item, index) => (
        <li key={index} className="relative flex items-center justify-center flex-grow">
          <_NavigationMobileItem {...item} />
        </li>
      ))}
    </ul>
  </nav>
)

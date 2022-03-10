import React from 'react'
import { classNames } from '../../helpers'
import { NavigationItem } from './types'
import { _NavigationItem } from './_NavigationItem'

type Navigation = {
  items: NavigationItem[]
  className?: string
}

export const Navigation = (props: Navigation) => (
  <nav className={classNames('px-4 rounded-lg h-12 ', props.className)} style={{ background: 'rgba(255,255,255,0.1)' }}>
    <ul className="flex justify-center h-full list-none">
      {props.items.map((item, index) => (
        <li key={index} className="flex items-center justify-center mx-4">
          <_NavigationItem {...item} />
        </li>
      ))}
    </ul>
  </nav>
)

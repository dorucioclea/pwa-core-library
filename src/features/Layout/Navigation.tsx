import React from 'react'
import { NavigationItem, _NavigationLink } from './_NavigationItem'

type Navigation = {
  items: NavigationItem[]
  className?: string
}

export const Navigation = (props: Navigation) => (
  <nav className={`px-4 rounded-lg h-12 ${props.className || ''}`} style={{ background: 'rgba(255,255,255,0.1)' }}>
    <ul className="flex justify-center h-full list-none">
      {props.items.map((item, index) => (
        <li className="flex items-center justify-center mx-4" key={index}>
          <_NavigationLink href={item.href} as={item.as} text={item.text} />
        </li>
      ))}
    </ul>
  </nav>
)

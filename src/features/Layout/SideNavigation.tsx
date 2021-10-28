import React from 'react'
import Link from 'next/link'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/dist/client/router'
import { useCallback } from 'react'

export type SideNavigationItem = {
  text: string
  href: string
  icon?: IconDefinition
  colorClassName?: string
}

type Props = {
  items: SideNavigationItem[]
  heading?: string
  className?: string
}

export const SideNavigation = ({ items, heading, className }: Props) => {
  const router = useRouter()
  const isActive = useCallback((item: SideNavigationItem) => item.href === router?.asPath, [router?.asPath])

  const linkDynamicClassNames = (item: SideNavigationItem) =>
    isActive(item) ? `bg-gray-100 ${item.colorClassName}` : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'

  const iconColorClassName = (item: SideNavigationItem) =>
    isActive(item) ? `text-gray-500 ${item.colorClassName}` : 'text-gray-400 group-hover:text-gray-500'

  return (
    <>
      {heading && <h2 className="text-gray-500 text-lg pl-1 mb-2">{heading}</h2>}
      <nav className={`space-y-2 text-lg ${className || ''}`} aria-label="Sidebar">
        {items.map((item) => (
          <Link key={item.text} href={item.href}>
            <a
              className={`group flex items-center px-3 py-2 rounded-lg ${linkDynamicClassNames(item)}`}
              aria-current={isActive(item) ? 'page' : undefined}
            >
              {item.icon && (
                <span className="inline-flex justify-center w-10">
                  <FontAwesomeIcon icon={item.icon} aria-hidden="true" className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${iconColorClassName(item)}`} />
                </span>
              )}
              <span className="tracking-wide">{item.text}</span>
            </a>
          </Link>
        ))}
      </nav>
    </>
  )
}

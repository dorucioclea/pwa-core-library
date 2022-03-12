import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast, ToastContainer, Flip } from 'react-toastify'
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import './Toast.css'

type Options = {
  icon?: IconProp
  href?: string
}

export const showToast = (text: string, type?: 'success' | 'info' | 'warning' | 'error' | 'vibe', options?: Options) => {
  const { icon, href } = options || {}

  const getCssBodyClassNames = () => {
    if (type === 'success') return 'bg-gradient-to-br from-green-300 to-green-500 border-green-600'
    if (type === 'warning') return 'bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-600'
    if (type === 'error') return 'bg-gradient-to-br from-red-300 to-red-500 border-red-600'
    if (type === 'vibe') return 'bg-gradient-to-br from-purple-400 to-pink-500 border-purple-600'
    return 'bg-gradient-to-br from-blue-300 to-blue-500 border-blue-400'
  }

  const getCssClassNames = () => {
    if (type === 'success') return 'bg-green-600'
    if (type === 'warning') return 'bg-yellow-600'
    if (type === 'error') return 'bg-red-600'
    if (type === 'vibe') return 'bg-purple-600'
    return 'text-blue-600'
  }

  const getCssProgressClassNames = () => {
    if (type === 'success') return 'bg-green-700'
    if (type === 'warning') return 'bg-yellow-700'
    if (type === 'error') return 'bg-red-700'
    if (type === 'vibe') return 'bg-purple-700'
    return 'text-blue-700'
  }

  const Content = () => {
    if (!!href) {
      return (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} className="relative block w-full">
          {!!icon && <FontAwesomeIcon icon={icon} className="inline-block mr-2 text-white opacity-80" />}
          {text}
          <FontAwesomeIcon icon={faExternalLink} className="block -mt-px absolute right-2 top-1/2 transform -translate-y-1/2 text-white opacity-80" />
        </a>
      )
    }
    if (!!icon) {
      return (
        <span>
          <FontAwesomeIcon icon={icon} className="inline-block mr-2 text-white opacity-80" />
          {text}
        </span>
      )
    }
    return text
  }

  toast(Content, {
    className: `rounded ${getCssClassNames()}`,
    bodyClassName: `flex border-l-4 px-4 py-2 max-w-lg rounded shadow-md text-white text-lg ${getCssBodyClassNames()}`,
    progressClassName: `rounded ${getCssProgressClassNames()}`,
    closeButton: false,
  })
}

export const ScyToastRoot = () => <ToastContainer position="top-center" transition={Flip} limit={5} />

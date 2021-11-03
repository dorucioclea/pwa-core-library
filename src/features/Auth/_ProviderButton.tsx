import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
  onClick: () => void
  children: any
  gradientClassName: [string, string]
}

export const _ProviderButton = (props: Props) => {
  const colorClassNames = `bg-gradient-to-br ${props.gradientClassName[0]} ${props.gradientClassName[1]} text-white`

  return (
    <button onClick={props.onClick} className={`relative ${colorClassNames} py-4 px-8 mb-4 w-full text-xl rounded-xl flex items-center`}>
      {props.children}
      <FontAwesomeIcon icon={faChevronRight} className="absolute right-0 mr-6 text-white opacity-75" />
    </button>
  )
}

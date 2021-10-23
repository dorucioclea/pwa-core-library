import React from 'react'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  onClick: () => void
}

export const DisconnectButton = (props: Props) => (
  <button onClick={props.onClick} className="p-2 rounded-full hover:shadow-2xl group">
    <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="text-gray-500 group-hover:text-gray-200" />
  </button>
)

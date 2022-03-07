import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  href?: string
  children?: string
  className?: string
}

export const BackButton = (props: Props) => {
  const router = useRouter()
  const displayText = props.children || 'Go back'

  return (
    <div className={props.className || 'mb-8'}>
      {props.href ? (
        <Link href={props.href}>
          <a className="text-blue-500 text-xl">
            <FontAwesomeIcon icon={faAngleDoubleLeft} className="text-blue-400 inline-block mr-2" />
            {displayText}
          </a>
        </Link>
      ) : (
        <button onClick={() => router.back()} className="text-blue-500 text-lg">
          <FontAwesomeIcon icon={faAngleDoubleLeft} className="text-blue-400 inline-block mr-2" />
          {displayText}
        </button>
      )}
    </div>
  )
}

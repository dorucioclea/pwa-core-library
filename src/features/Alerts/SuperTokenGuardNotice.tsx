import React from 'react'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNames } from '../..'
import { SuperTokenLogo } from '../Logos/SuperTokenLogo'

type Props = {
  type: 'hold' | 'cost'
  amount: number
  buyLinkUrl?: string
  className?: string
}

export const SuperTokenGuardNotice = (props: Props) => {
  const Content = ({ className }: { className?: string }) => (
    <div className={classNames('flex items-center', className)}>
      <div className="flex-shrink-0">
        <SuperTokenLogo className="w-6 h-6 lg:w-8 lg:h-8" />
      </div>
      <div className="ml-3 flex-1 md:flex md:justify-between">
        <p className="text-base sm:text-lg xl:text-xl text-indigo-700">
          {props.type === 'hold' && (
            <span>
              You must <strong>hold</strong> at least <strong>{props.amount} SUPER</strong> tokens to perform this action.
            </span>
          )}
          {props.type === 'cost' && (
            <span>
              This action costs <strong>{props.amount} SUPER</strong> tokens.
            </span>
          )}
        </p>
      </div>
    </div>
  )

  return !!props.buyLinkUrl ? (
    <a
      href={props.buyLinkUrl}
      target="_blank"
      className={classNames(
        'flex items-center rounded-xl bg-indigo-100 px-4 py-2 md:py-3',
        props.buyLinkUrl ? '' : 'cursor-default',
        props.className
      )}
    >
      <Content className="flex-grow" />
      <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" className="text-indigo-500" />
    </a>
  ) : (
    <div className={classNames('rounded-xl bg-indigo-100 px-4 py-2 md:py-3', props.className)}>
      <Content />
    </div>
  )
}

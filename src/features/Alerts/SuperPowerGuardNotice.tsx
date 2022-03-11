import React from 'react'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNames } from '../../helpers'
import { SuperPowerLogo } from '../Logos/SuperPowerLogo'

type Props = {
  amount: number
  linkUrl?: string
  className?: string
}

export const SuperPowerGuardNotice = (props: Props) => {
  const Content = ({ className }: { className?: string }) => (
    <div className={classNames('flex items-center', className)}>
      <div className="flex-shrink-0">
        <SuperPowerLogo className="w-6 h-6 lg:w-8 lg:h-8" />
      </div>
      <div className="ml-3 flex-1 md:flex md:justify-between">
        <p className="text-base sm:text-lg xl:text-xl text-red-600">
          You must <strong>possess</strong> at least <strong>{props.amount} SUPERPOWER</strong> to perform this action. This equals holding a minimum
          of 500 SUPER tokens.
        </p>
      </div>
    </div>
  )

  return !!props.linkUrl ? (
    <a
      href={props.linkUrl}
      target="_blank"
      className={classNames('flex items-center rounded-xl bg-red-100 px-4 py-2 md:py-3', props.linkUrl ? '' : 'cursor-default', props.className)}
    >
      <Content className="flex-grow" />
      <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" className="text-red-500" />
    </a>
  ) : (
    <div className={classNames('rounded-xl bg-red-100 px-4 py-2 md:py-3', props.className)}>
      <Content />
    </div>
  )
}

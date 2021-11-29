import React from 'react'
import { classNames } from '../../helpers'

type Props = {
  total: number
  active: number
  className?: string
}

export const Steps = (props: Props) => (
  <ol role="list" className={classNames('flex items-center space-x-5', props.className)}>
    {Array.from(Array(props.total).keys()).map((step) => (
      <li key={step}>
        {step < props.active - 1 ? (
          <span className="block w-2.5 h-2.5 bg-primary-400 rounded-full hover:bg-indigo-900">
            <span className="sr-only">{`Step ${step}`}</span>
          </span>
        ) : step === props.active - 1 ? (
          <span className="relative flex items-center justify-center" aria-current="step">
            <span className="absolute w-5 h-5 p-px flex" aria-hidden="true">
              <span className="w-full h-full rounded-full bg-primary-200" />
            </span>
            <span className="relative block w-2.5 h-2.5 bg-primary-400 rounded-full" aria-hidden="true" />
            <span className="sr-only">{`Step ${step}`}</span>
          </span>
        ) : (
          <span className="block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400">
            <span className="sr-only">{`Step ${step}`}</span>
          </span>
        )}
      </li>
    ))}
  </ol>
)

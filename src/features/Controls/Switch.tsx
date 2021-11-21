import React from 'react'
import { classNames } from '../../helpers'

type IProps = {
  label: string
  checked: boolean
  onChange: (isChecked: boolean) => void
  className?: string
}

export const Switch = (props: IProps) => (
  <button
    type="button"
    onClick={() => props.onChange(!props.checked)}
    className={classNames(
      'relative inline-flex flex-shrink-0 h-8 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-green-100',
      props.checked ? 'bg-green-400' : 'bg-gray-200',
      props.className || ''
    )}
    role="switch"
    aria-checked="false"
  >
    <span className="sr-only">{props.label}</span>
    <span
      aria-hidden="true"
      className={classNames(
        'pointer-events-none inline-block h-7 w-7 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
        props.checked ? 'translate-x-6' : 'translate-x-0'
      )}
    ></span>
  </button>
)

import React, { useState } from 'react'
import { Tooltip } from '../..'
import { classNames } from '../../helpers'

export type RadioGroupItem = {
  id: string
  title: string
  tip?: string
  default?: boolean
  disabled?: boolean
}

type Props = {
  items: RadioGroupItem[]
  onChange: (activeId: string) => void
  tipPlace?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

export const RadioGroup = (props: Props) => {
  const defaultActiveState = props.items.find((i) => i.default)?.id || props.items[0]
  const [activeId, setActiveId] = useState(defaultActiveState)

  const isActive = (id: string) => activeId === id

  const handleChange = (id: string) => {
    setActiveId(id)
    props.onChange(id)
  }

  return (
    <div className={classNames('flex', props.className)}>
      {props.items.map((item) => (
        <div key={item.id}>
          <input
            id={item.id}
            name="notification-method"
            type="radio"
            checked={isActive(item.id)}
            onChange={() => handleChange(item.id)}
            className="hidden"
          />
          <Tooltip tip={item.tip} place={props.tipPlace}>
            <label
              htmlFor={item.id}
              className={classNames(
                item.disabled ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer focus:outline-none',
                isActive(item.id)
                  ? 'bg-primary-400 border-transparent text-white hover:bg-primary-500 hover:shadow-lg'
                  : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                'border rounded-md py-2 px-4 flex items-center justify-center text-lg md:text-xl sm:flex-1 mr-2'
              )}
            >
              {item.title}
            </label>
          </Tooltip>
        </div>
      ))}
    </div>
  )
}

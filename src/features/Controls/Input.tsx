import React, { ChangeEvent, forwardRef } from 'react'
import { classNames } from '../../helpers'
import { IntersectProps } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'

type Props = {
  onChange: (value: string) => void
  icon?: IconDefinition
  pre?: string
  className?: string
}

type InputHtmlElement = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const DefaultClassNames =
  'focus:outline-none border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 bg-gray-200 w-full appearance-none leading-normal block px-4 py-2 text-xl rounded-xl transition duration-300'

export const Input = forwardRef((props: IntersectProps<InputHtmlElement, Props>, ref: React.ForwardedRef<HTMLInputElement>) => {
  const showCharLimit = !!props.value && !!props.maxLength && props.type !== 'number' && props.maxLength > 1

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    props.type === 'number' ? props.onChange(e.target.value.substring(0, props.maxLength || 20)) : props.onChange(e.target.value)

  return !!props.icon || !!props.pre ? (
    <div className={props.className}>
      <div className="relative">
        <div className="pointer-events-none flex items-center absolute inset-y-0 left-0 pl-3">
          {props.icon && <FontAwesomeIcon icon={props.icon} className="text-gray-600" />}
          {props.pre && <span className="font-head text-gray-600">{props.pre}</span>}
        </div>
        <input
          {...props}
          ref={ref}
          onChange={handleChange}
          className={classNames(DefaultClassNames, props.className, props.pre ? 'pl-16' : 'pl-10')}
        />
      </div>
    </div>
  ) : (
    <div className={classNames('relative w-full', props.className)}>
      <input {...props} ref={ref} onChange={handleChange} className={DefaultClassNames} />
      {showCharLimit && (
        <small className="absolute right-2 -bottom-6 text-gray-500 text-sm">
          ({(props.value as string).length} / {props.maxLength})
        </small>
      )}
    </div>
  )
})

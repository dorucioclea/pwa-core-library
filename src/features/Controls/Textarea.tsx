import React, { InputHTMLAttributes, ChangeEvent } from 'react'
import { classNames } from '../../helpers'
import { IntersectProps } from '../../types'

type Props = {
  onChange: (value: string) => void
  className?: string
}

const DefaultClassNames =
  'focus:outline-none border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-600 bg-gray-200 w-full appearance-none leading-normal block px-4 py-2 text-xl rounded-xl transition duration-300'

export const Textarea = (props: IntersectProps<InputHTMLAttributes<HTMLTextAreaElement>, Props>) => (
  <div className={classNames('relative w-full', props.className)}>
    <textarea {...props} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => props.onChange(e.target.value)} className={DefaultClassNames} />
  </div>
)

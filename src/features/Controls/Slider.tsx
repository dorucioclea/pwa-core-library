import React from 'react'
import ReactSlider from 'react-slider'

type Props = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export const Slider = (props: Props) => (
  <div className={props.className}>
    <ReactSlider
      value={props.value}
      min={props.min}
      max={props.max}
      onChange={(val) => props.onChange(val)}
      className="flex items-center w-full h-6"
      trackClassName="block bg-gray-200 h-5 rounded-xl"
      thumbClassName="bg-primary-400 w-8 h-8 -mt-1 rounded-xl shadow focus:border-white hover:opacity-80 hover:shadow-3xl focus:outline-none hover:cursor-pointer"
    />
  </div>
)

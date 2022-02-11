import React, { useEffect, useState } from 'react'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNames } from '../../helpers'

type Props = {
  className?: string
}

const AvailableColors = ['text-red-500', 'text-green-500', 'text-blue-500', 'text-yellow-500', 'text-pink-500', 'text-indigo-500']

export const TxProcessingIndicator = (props: Props) => {
  const [colorCssClassName, setColorCssClassName] = useState(AvailableColors[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomColorCssClassName = AvailableColors[Math.floor(Math.random() * AvailableColors.length)]
      setColorCssClassName(randomColorCssClassName)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={classNames('animate-ping', props.className)}>
      <FontAwesomeIcon icon={faCircleNotch} size="2x" className={classNames('animate-spin', colorCssClassName)} />
    </span>
  )
}

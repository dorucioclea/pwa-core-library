import React from 'react'
import { classNames } from '../../helpers'
import { TxProcessingIndicator } from './TxProcessingIndicator'

type Props = {
  className?: string
  text?: string
}

export const TxProcessingIndicatorOverlay = (props: Props) => (
  <div className={classNames('absolute z-50 inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center -mt-2', props.className)}>
    <TxProcessingIndicator className="mb-8" />
    <p className="text-gray-800 text-2xl animate-pulse">{props.text || 'Processing your transaction on the blockchain ...'}</p>
  </div>
)

import React from 'react'
import { Tooltip } from '../Feedback/Tooltip'

type Props = {
  amount?: number
  actions?: string[]
}

export const SignTxNote = (props: Props) => {
  const amount = props.amount || 1
  const txLabel = amount > 1 ? 'transactions' : 'transaction'
  const tooltip = props.actions ? `Actions: ${props.actions.join(', ')}` : null

  return (
    <Tooltip tip={tooltip}>
      <p className="text-xl mb-2">
        You will be asked to <span className="text-blue-500">sign</span> {amount} {txLabel}
      </p>
    </Tooltip>
  )
}

import React from 'react'
import { Tooltip } from '../Feedback/Tooltip'

type Props = {
  txs: string[]
}

export const SignTxNote = (props: Props) => {
  const amount = props.txs.length
  const txLabel = amount > 1 ? 'transactions' : 'transaction'
  const tooltip = props.txs.join(', ')

  return (
    <Tooltip tip={tooltip}>
      <p className="text-xl">
        You will be asked to <span className="text-blue-500">sign</span> {amount} {txLabel}
      </p>
    </Tooltip>
  )
}

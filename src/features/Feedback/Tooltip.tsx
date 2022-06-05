import ReactTooltip from 'react-tooltip'
import React, { ReactElement, useEffect } from 'react'
import './Tooltip.css'

type Props = {
  tip?: string | null
  place?: 'top' | 'right' | 'bottom' | 'left'
  children: ReactElement
  className?: string
}

export const Tooltip = (props: Props) => {
  const hasTip = !!props.tip

  useEffect(() => {
    if (!hasTip) return
    ReactTooltip.rebuild()
  }, [hasTip])

  return hasTip ? (
    <span data-tip={props.tip} data-place={props.place}>
      {props.children}
    </span>
  ) : (
    props.children
  )
}

export const ScyTooltipRoot = () => <ReactTooltip arrowColor="transparent" className="scy-tooltip" />

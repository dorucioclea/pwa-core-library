import React, { ReactElement, useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import './Tooltip.css'

type Props = {
  tip?: string | null
  children: ReactElement
  className?: string
}

export const Tooltip = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      {!!props.tip ? <span data-tip={props.tip}>{props.children}</span> : props.children}
      {!!props.tip && isMounted && <ReactTooltip arrowColor="transparent" className="scy-tooltip" />}
    </>
  )
}

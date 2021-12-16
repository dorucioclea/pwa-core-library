import React from 'react'
import ReactTooltip from 'react-tooltip'
import { ScyToastRoot } from './features/Feedback/Toast'
import './ScyRoot.css'

export const ScyRoot = () => (
  <>
    <ScyToastRoot />
    <ReactTooltip arrowColor="transparent" className="scy-tooltip" />
  </>
)

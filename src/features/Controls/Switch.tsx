import React from 'react'
import BaseSwitch from 'react-switch'

type IProps = {
  checked: boolean
  onChange: (isChecked: boolean) => void
  color?: string
  colorHandle?: string
  className?: string
}

export const Switch = (props: IProps) => (
  <div className={props.className}>
    <BaseSwitch
      checked={props.checked}
      onChange={(checked) => props.onChange(checked)}
      onColor={props.color || '#9AE6B4'}
      onHandleColor={props.colorHandle || '#48BB78'}
      handleDiameter={25}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
      height={20}
      width={48}
    />
  </div>
)

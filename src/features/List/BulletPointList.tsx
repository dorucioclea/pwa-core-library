import React, { CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import { classNames } from '../../helpers'

interface IProps {
  icon: any
  iconClassName?: string
  iconSize?: SizeProp
  items: string[]
  className?: string
  itemClassName?: string
  style?: CSSProperties
}

export const BulletPointList = (props: IProps) => (
  <ul className={classNames('fa-ul', props.className)} style={props.style}>
    {props.items.map((item, index) => (
      <li key={index} className={props.itemClassName}>
        <span className={classNames('fa-li', props.iconClassName)}>
          <FontAwesomeIcon icon={props.icon} size={props.iconSize} />
        </span>
        {item}
      </li>
    ))}
  </ul>
)

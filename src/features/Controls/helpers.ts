import { AppSystemColor } from '../../types'

export const getButtonBgColorClassName = (color?: AppSystemColor, disabled?: boolean) => {
  if (disabled) return 'bg-gray-400'
  if (!color) return ''
  if (color === 'blue') return 'bg-blue-500'
  if (color === 'red') return 'bg-red-500'
  // add more colors as needed ...
  return 'bg-primary-400'
}

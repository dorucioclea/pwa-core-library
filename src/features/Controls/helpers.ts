import { AppSystemColor } from '../../types'

export const getButtonColorClassNames = (color?: AppSystemColor, disabled?: boolean, inverted?: boolean) => {
  if (disabled) return 'bg-gray-400 text-white'
  if (color === 'blue') return inverted ? 'text-blue-500 bg-white' : 'bg-blue-500 text-white'
  if (color === 'red') return inverted ? 'text-red-500 bg-white' : 'bg-red-500 text-white'
  if (color === 'gray') return inverted ? 'text-gray-500 bg-white' : 'bg-gray-800 text-white'
  if (color === 'black') return inverted ? 'text-black-500 bg-white' : 'bg-black text-white'
  if (color === 'white') return inverted ? 'text-gray-100 bg-black' : 'bg-white text-gray-800'
  if (color === 'indigo') return inverted ? 'text-indigo-500 bg-white' : 'bg-indigo-500 text-white'
  if (color === 'yellow') return inverted ? 'text-yellow-500 bg-white' : 'bg-yellow-300 text-white'
  if (color === 'green') return inverted ? 'text-green-500 bg-white' : 'bg-green-500 text-white'
  if (color === 'purple') return inverted ? 'text-purple-500 bg-white' : 'bg-purple-500 text-white'
  if (color === 'pink') return inverted ? 'text-pink-500 bg-white' : 'bg-pink-500 text-white'
  return inverted ? 'text-primary-400 bg-white' : 'bg-primary-400 text-white'
}

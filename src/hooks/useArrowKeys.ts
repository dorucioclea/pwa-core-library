import { DependencyList, useEffect } from 'react'

type Props = {
  onUp?: () => void
  onRight?: () => void
  onDown?: () => void
  onLeft?: () => void
}

export function useArrowKeys(props: Props, deps?: DependencyList | undefined) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
        e.preventDefault()
      }
      if (e.key === 'ArrowUp' && props.onUp) props.onUp()
      if (e.key === 'ArrowRight' && props.onRight) props.onRight()
      if (e.key === 'ArrowDown' && props.onDown) props.onDown()
      if (e.key === 'ArrowLeft' && props.onLeft) props.onLeft()
    }

    document.addEventListener('keydown', listener)

    return () => document.removeEventListener('keydown', listener)
  }, deps)
}

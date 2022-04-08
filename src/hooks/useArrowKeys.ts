import { useEffect } from 'react'

type Props = {
  onUp?: () => void
  onRight?: () => void
  onDown?: () => void
  onLeft?: () => void
}

export function useArrowKeys(props: Props) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && props.onUp) props.onUp()
      if (e.key === 'ArrowRight' && props.onRight) props.onRight()
      if (e.key === 'ArrowDown' && props.onDown) props.onDown()
      if (e.key === 'ArrowLeft' && props.onLeft) props.onLeft()
    }

    document.addEventListener('keydown', listener)

    return () => document.removeEventListener('keydown', listener)
  }, [])
}

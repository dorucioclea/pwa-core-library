import React from 'react'

type Props = {
  classNameEdge1?: string
  classNameEdge2?: string
}

export const PatternDropinEdges = (props: Props) => (
  <svg
    className="absolute inset-0 h-full w-full"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 1463 360"
    aria-hidden="true"
  >
    <path
      className={props.classNameEdge1 || 'text-white text-opacity-5'}
      fill="currentColor"
      d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
    />
    <path
      className={props.classNameEdge2 || 'text-white text-opacity-10'}
      fill="currentColor"
      d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
    />
  </svg>
)

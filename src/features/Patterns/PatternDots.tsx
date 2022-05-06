import React from 'react'

type Props = {
  className?: string
}

export const PatternDots = (props: Props) => (
  <svg className={props.className} width={404} height={392} fill="none" viewBox="0 0 404 392" aria-hidden="true">
    <defs>
      <pattern id="8228f071-bcee-4ec8-905a-2a059a2cc4fb" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
        <rect x={0} y={0} width={5} height={5} className="text-gray-200" fill="currentColor" />
      </pattern>
    </defs>
    <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
  </svg>
)

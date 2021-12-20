import * as React from 'react'

type Props = {
  white?: boolean
  className?: string
}

export const MaiarAppWalletLogo = (props: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.5 28" className={props.className || 'h-10'}>
    <defs>
      <style>{`.cls-maiar-app-2{fill:${props.white ? '#1f43f7' : '#fff'}}`}</style>
    </defs>
    <g transform="translate(11007 -18884.001)">
      <path
        d="M14.875-21H2.625A2.626 2.626 0 0 0 0-18.375v22.75A2.626 2.626 0 0 0 2.625 7h12.25A2.626 2.626 0 0 0 17.5 4.375v-22.75A2.626 2.626 0 0 0 14.875-21Z"
        transform="translate(-11007 18905)"
        style={{
          fill: props.white ? '#fff' : '#1f43f7',
        }}
      />
      <path className="cls-maiar-app-2" d="m-11000.495 18898.92.008-.01-2.263 2.258v-9l4.5 4.5 4.5-4.5v9l-2.25-2.248-2.25 2.248Z" />
      <circle className="cls-maiar-app-2" cx={1.5} cy={1.5} r={1.5} transform="translate(-10999.75 18906.498)" />
    </g>
  </svg>
)

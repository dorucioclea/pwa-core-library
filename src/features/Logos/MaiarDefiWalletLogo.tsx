import * as React from 'react'

type Props = {
  white?: boolean
  className?: string
}

export const MaiarDefiWalletLogo = (props: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24" className={props.className || 'h-10'}>
    <defs>
      <style>{`.cls-maiar-extension-2{fill: ${props.white ? '#1f43f7' : '#fff'}}`}</style>
    </defs>
    <g transform="translate(11024 -18800.5)">
      <path
        d="M21.619-15H3.75a.75.75 0 0 1-.75-.75.75.75 0 0 1 .75-.75h18a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25H3a3 3 0 0 0-3 3v15a3 3 0 0 0 3 3h18.619A2.321 2.321 0 0 0 24-.75v-12A2.321 2.321 0 0 0 21.619-15Z"
        transform="translate(-11024 18820)"
        style={{
          fill: props.white ? '#fff' : '#1f43f7',
        }}
      />
      <path
        className="cls-maiar-extension-2"
        d="m-11015.12 18815.379.007-.009-2.137 2.132v-8.5l4.249 4.254 4.251-4.254v8.5l-2.125-2.123-2.125 2.123Z"
      />
      <circle className="cls-maiar-extension-2" cx={1.314} cy={1.314} r={1.314} transform="translate(-11004.771 18812.314)" />
    </g>
  </svg>
)

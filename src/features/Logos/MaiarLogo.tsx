import React, { SVGProps, useMemo } from 'react'

type Props = {
  white?: boolean
}

export const MaiarLogo = (props: SVGProps<SVGSVGElement> & Props) => {
  const scopedPrefixId = useMemo(() => Math.floor(Math.random() * 1000).toString(), [])

  return props.white ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" {...props} className={props.className || 'w-10 h-10'}>
      <defs>
        <linearGradient x1="25.065%" x2="50%" y1="50%" y2="62.5%" id={`prefix__a-${scopedPrefixId}`}>
          <stop stopColor="#FFF" offset="0%" />
          <stop stopColor="#D9D9D9" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" x2="74.925%" y1="62.503%" y2="50%" id={`prefix__b-${scopedPrefixId}`}>
          <stop stopColor="#D9D9D9" offset="0%" />
          <stop stopColor="#FFF" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill={`url(#prefix__a-${scopedPrefixId}`} d="M45 15L29.95 30.096 15.039 45-15 15z" transform="matrix(0 1 1 0 -15 15)" />
        <path fill={`url(#prefix__b-${scopedPrefixId}`} d="M67.499 37.499l-15 15.002-15-15.002z" transform="rotate(90 52.5 45)" />
        <path fill="#FFF" d="M30 60L15.008 45 60 0v30z" />
      </g>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" {...props} className={props.className || 'w-10 h-10'}>
      <defs>
        <linearGradient id={`prefix__a-${scopedPrefixId}`} x1="25.065%" x2="50%" y1="50%" y2="62.5%">
          <stop offset="0%" stopColor="#1A45C2" />
          <stop offset="100%" stopColor="#001F9C" />
        </linearGradient>
        <linearGradient id={`prefix__b-${scopedPrefixId}`} x1="50%" x2="74.925%" y1="62.503%" y2="50%">
          <stop offset="0%" stopColor="#001F9C" />
          <stop offset="100%" stopColor="#1A45C2" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill={`url(#prefix__a-${scopedPrefixId}`} d="M45 15L29.95 30.096 15.039 45-15 15z" transform="matrix(0 1 1 0 -15 15)" />
        <path fill={`url(#prefix__b-${scopedPrefixId}`} d="M67.499 37.499l-15 15.002-15-15.002z" transform="rotate(90 52.5 45)" />
        <path fill="#1A45C2" d="M30 60L15.008 45 60 0v30z" />
      </g>
    </svg>
  )
}

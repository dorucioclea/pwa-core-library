import React, { SVGProps } from 'react'

type Props = {
  white?: boolean
}

export const LedgerLogo = (props: SVGProps<SVGSVGElement> & Props) => {
  const colorCode = props.white ? '#fff' : '#142533'

  return (
    <svg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" {...props} fill={colorCode} className={props.className || 'w-10 h-10'}>
      <path d="M34.488.041H15.772v25.282h25.27V6.583c0-3.59-2.951-6.542-6.534-6.542h-.02zM9.937.041H6.712C3.129.041.179 2.995.179 6.583v3.23h9.758V.04zM.179 15.655h9.758v9.77H.18v-9.77zM31.365 40.957h3.225c3.585 0 6.533-2.954 6.533-6.542v-3.147h-9.758v9.689zM15.772 31.268h9.758v9.771h-9.758v-9.771zM.179 31.268v3.23c0 3.587 2.95 6.541 6.533 6.541h3.225v-9.771H.18z" />
    </svg>
  )
}

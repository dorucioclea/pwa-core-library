import React from 'react'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SupercietyWebUrl = 'https://superciety.com'

export const BrandingBanner = () => (
  <div className="bg-black flex justify-center p-2 text-lg md:text-xl text-white">
    <a href={SupercietyWebUrl} target="_blank" className="space-x-2" style={{ borderWidth: 0 }}>
      <span>A service by</span>
      <strong>Superciety</strong>
      <span className="inline-block -mt-1">
        <SupercietyLogoWhite />
      </span>
      <span>Join us on Elrond</span>
      <FontAwesomeIcon icon={faAngleDoubleRight} className="text-white" />
    </a>
  </div>
)

const SupercietyLogoWhite = () => (
  <svg viewBox="0 0 402 402" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 md:w-6">
    <circle cx={260.215} cy={82.023} r={16} transform="rotate(-45 260.215 82.023)" fill="#fff" />
    <circle cx={379.009} cy={200.817} r={16} transform="rotate(-45 379.009 200.817)" fill="#fff" />
    <circle cx={141.421} cy={200.817} r={16} transform="rotate(-45 141.421 200.817)" fill="#fff" />
    <circle cx={260.215} cy={319.611} r={16} transform="rotate(-45 260.215 319.611)" fill="#fff" />
    <circle cx={200.818} cy={141.421} r={16} transform="rotate(-45 200.818 141.421)" fill="#fff" />
    <circle cx={319.612} cy={260.214} r={16} transform="rotate(-45 319.612 260.214)" fill="#fff" />
    <circle cx={82.024} cy={260.214} r={16} transform="rotate(-45 82.024 260.214)" fill="#fff" />
    <circle cx={200.818} cy={379.009} r={16} transform="rotate(-45 200.818 379.009)" fill="#fff" />
    <circle cx={141.421} cy={82.023} r={16} transform="rotate(-45 141.421 82.023)" fill="#fff" />
    <circle cx={260.215} cy={200.817} r={16} transform="rotate(-45 260.215 200.817)" fill="#fff" />
    <circle cx={22.627} cy={200.817} r={16} transform="rotate(-45 22.627 200.817)" fill="#fff" />
    <circle cx={141.421} cy={319.611} r={16} transform="rotate(-45 141.421 319.611)" fill="#fff" />
    <circle cx={200.818} cy={22.627} r={16} transform="rotate(-45 200.818 22.627)" fill="#fff" />
    <circle cx={319.612} cy={141.421} r={16} transform="rotate(-45 319.612 141.421)" fill="#fff" />
    <circle cx={82.024} cy={141.421} r={16} transform="rotate(-45 82.024 141.421)" fill="#fff" />
    <circle cx={200.818} cy={260.214} r={16} transform="rotate(-45 200.818 260.214)" fill="#fff" />
  </svg>
)

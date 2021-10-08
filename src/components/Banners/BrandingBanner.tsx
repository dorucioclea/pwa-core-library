import React from 'react'

export const BrandingBanner = () => (
  <div className="bg-black p-2">
    <div className="max-w-4xl mx-auto flex justify-around text-white text-lg">
      <a href="#" className="font-head font-bold">
        Superciety
      </a>
      <a href="#" target="_blank">
        <span className="mr-2">Join the Superciety DAO on Elrond</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="inline h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  </div>
)

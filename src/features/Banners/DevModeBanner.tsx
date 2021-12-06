import React from 'react'

export const DevModeBanner = () => {
  if (typeof window === 'undefined') return null
  const hostname = window.location.hostname
  const fragments = hostname.match(/^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/)
  const domain = !!fragments ? fragments[1] : null

  const getChainName = () => {
    if (hostname.includes('devnet')) return 'devnet'
    if (hostname.includes('testnet')) return 'testnet'
    return null
  }

  return (
    <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 text-center">
      <p className="text-white text-lg">
        This is the {getChainName()} development version of{' '}
        <a href={`https://${domain}`} className="text-white hover:text-red-100 font-bold" style={{ borderBottomWidth: 1, borderColor: '#fff' }}>
          {domain}
        </a>
        .
      </p>
    </div>
  )
}

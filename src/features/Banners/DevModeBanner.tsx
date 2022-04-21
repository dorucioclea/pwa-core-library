import React, { useEffect, useState } from 'react'

const FaucetLinkUrl = 'https://r3d4.fr/faucet'

export const DevModeBanner = () => {
  const [hostname, setHostname] = useState<string | null>(null)

  useEffect(() => {
    setHostname(window.location.hostname)
  }, [])

  if (!hostname) {
    return null
  }

  const fragments = hostname.match(/^(?:.*?\.)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/)
  const domain = !!fragments ? fragments[1] : null

  return (
    <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 text-center">
      <p className="text-white text-lg">
        This is the {getChainName(hostname)} version of{' '}
        <a href={`https://${domain}`} className="text-white hover:text-red-100 font-bold" style={{ borderBottomWidth: 1, borderColor: '#fff' }}>
          {domain}
        </a>
        .{' '}
        <a
          href={FaucetLinkUrl}
          target="_blank"
          rel="noopener"
          className="text-white hover:text-red-100 font-bold"
          style={{ borderBottomWidth: 1, borderColor: '#fff' }}
        >
          Claim Test tokens
        </a>
      </p>
    </div>
  )
}

const getChainName = (host: string) => {
  if (host.includes('devnet')) return 'devnet'
  if (host.includes('testnet')) return 'testnet'
  return 'test'
}

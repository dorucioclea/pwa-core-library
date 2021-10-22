import React, { useEffect } from 'react'
import _ProviderButton from './_ProviderButton'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { StickyModal } from '../..'
import { Button } from '../Controls/Button'
import { AuthWalletProvider, ElrondAuthService, ProofableLogin } from '../../services/auth'

type Props = {
  onTokenRequest: () => Promise<string>
  onLocalLogin: (proofable: ProofableLogin) => void
}

export const ConnectButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [proofableToken, setProofableToken] = useState<string | null>(null)

  const init = async () => setProofableToken(await props.onTokenRequest())

  useEffect(() => {
    if (!isOpen) return
    init()
  }, [isOpen])

  const handleLogin = async (provider: AuthWalletProvider) => {
    if (!proofableToken) return
    const authService = new ElrondAuthService(provider)
    const proofableLogin = await authService.login(proofableToken)
    props.onLocalLogin(proofableLogin)
  }

  return (
    <>
      <Button color="blue" onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={faBolt} className="inline-block mr-2 text-white opacity-75" />
        Connect
      </Button>
      <StickyModal open={isOpen} onClose={() => setIsOpen(false)}>
        <_ProviderButton gradientClassName={['from-blue-400', 'to-blue-600']} onClick={() => handleLogin('extension')}>
          Maiar App
        </_ProviderButton>
        <_ProviderButton gradientClassName={['from-blue-500', 'to-blue-400']} onClick={() => handleLogin('extension')}>
          Maiar Browser
        </_ProviderButton>
        <_ProviderButton gradientClassName={['from-gray-700', 'to-gray-800']} onClick={() => handleLogin('extension')}>
          Ledger
        </_ProviderButton>
        <_ProviderButton gradientClassName={['from-gray-700', 'to-gray-500']} onClick={() => handleLogin('extension')}>
          Web Wallet
        </_ProviderButton>
      </StickyModal>
    </>
  )
}

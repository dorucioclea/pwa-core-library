import type { WalletProviderId, WalletServiceConfig } from '../../services/wallet'
import React, { useEffect, useState } from 'react'
import _ProviderButton from './_ProviderButton'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MaiarLogo } from '../Logos/MaiarLogo'
import { ElrondLogo } from '../Logos/ElrondLogo'
import { LedgerLogo } from '../Logos/LedgerLogo'
import { StickyModal } from '../Modals/StickyModal'
import { Button } from '../Controls/Button'
import { WalletService, ProofableLogin } from '../../services/wallet'

const ElrondWalletSetupLinkUrl = 'https://testnet-wallet.elrond.com/create'

type Props = {
  walletConfig: WalletServiceConfig
  onTokenRequest: () => Promise<string>
  onLocalLogin: (proofable: ProofableLogin) => void
}

export const ConnectButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [proofableToken, setProofableToken] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return
    init()
  }, [isOpen])

  const init = async () => setProofableToken(await props.onTokenRequest())

  const handleLogin = async (provider: WalletProviderId) => {
    if (!proofableToken) return
    const authService = new WalletService(provider, props.walletConfig)
    const proofableLogin = await authService.login(proofableToken)
    setIsOpen(false)
    props.onLocalLogin(proofableLogin)
  }

  return (
    <>
      <Button color="blue" onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={faBolt} className="inline-block mr-2 text-white opacity-75" />
        Connect
      </Button>
      <StickyModal open={isOpen} onClose={() => setIsOpen(false)}>
        <_ProviderButton gradientClassName={['from-blue-500', 'to-blue-600']} onClick={() => handleLogin('maiar_app')}>
          <MaiarLogo white className="w-6 h-6 mr-4" />
          Maiar App
        </_ProviderButton>
        <_ProviderButton gradientClassName={['from-blue-500', 'to-blue-300']} onClick={() => handleLogin('maiar_extension')}>
          <MaiarLogo white className="w-6 h-6 mr-4" />
          Maiar Browser
        </_ProviderButton>
        <_ProviderButton gradientClassName={['from-gray-700', 'to-gray-900']} onClick={() => handleLogin('hardware')}>
          <LedgerLogo white className="w-6 h-6 mr-4" />
          Ledger
        </_ProviderButton>
        <_ProviderButton gradientClassName={['from-gray-700', 'to-gray-500']} onClick={() => handleLogin('web')}>
          <ElrondLogo white className="w-6 h-6 mr-4" />
          Web Wallet
        </_ProviderButton>
        <p className="text-xl text-gray-500 text-center leading-tight mt-8">
          <strong className="block">New to Elrond Blockchain?</strong>
          <a href={ElrondWalletSetupLinkUrl} target="_blank" className="text-base">
            Learn How to setup a wallet
          </a>
        </p>
      </StickyModal>
    </>
  )
}

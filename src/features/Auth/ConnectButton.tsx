import React, { useEffect, useState } from 'react'
import type { IWalletService, WalletProviderId, WalletServiceConfig } from '../../services/wallet'
import { _ProviderButton } from './_ProviderButton'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StickyModal } from '../Modals/StickyModal'
import { Button } from '../Controls/Button'
import { WalletService, ProofableLogin } from '../../services/wallet'
import { _ProviderSelector } from './_ProviderSelector'
import { _ProviderConnector } from './_ProviderConnector'

type Props = {
  walletConfig: WalletServiceConfig
  onTokenRequest: () => Promise<string>
  onLocalLogin: (proofable: ProofableLogin) => void
  forceOpen?: boolean
}

export const ConnectButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState(props.forceOpen || false)
  const [wallet, setWallet] = useState<WalletService | null>(null)
  const [proofableToken, setProofableToken] = useState<string | null>(null)
  const [activeConnector, setActiveConnector] = useState<WalletProviderId | null>(null)

  useEffect(() => {
    if (!isOpen) return
    init()
  }, [isOpen])

  const init = async () => setProofableToken(await props.onTokenRequest())

  const handleLoginRequest = async (provider: WalletProviderId) => {
    const walletService = new WalletService(provider, props.walletConfig)
    walletService.onLogin = (proof) => props.onLocalLogin(proof)

    await walletService.init()

    setWallet(walletService)

    if (provider === 'maiar_app') setActiveConnector(provider)
    if (provider === 'maiar_extension') handleLogin(walletService)
    if (provider === 'hardware') handleLogin(walletService)
    if (provider === 'web') handleLogin(walletService)
  }

  const handleLogin = async (ws: IWalletService) => {
    if (!proofableToken || !wallet) return
    await ws.login(proofableToken)
    setIsOpen(false)
    setActiveConnector(null)
  }

  return (
    <>
      <Button color="blue" onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={faBolt} className="inline-block mr-2 text-white opacity-75" />
        Connect
      </Button>
      <StickyModal open={isOpen} onClose={() => setIsOpen(false)}>
        {!!activeConnector && wallet && proofableToken ? (
          <_ProviderConnector
            provider={activeConnector}
            wallet={wallet}
            proofableToken={proofableToken}
            onCloseRequest={() => setActiveConnector(null)}
          />
        ) : (
          <_ProviderSelector onLoginRequest={handleLoginRequest} />
        )}
      </StickyModal>
    </>
  )
}

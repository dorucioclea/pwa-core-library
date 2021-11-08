import type { IWalletService, WalletProviderId, WalletServiceConfig } from '../../services/wallet'
import React, { useEffect, useState } from 'react'
import { _ProviderButton } from './_ProviderButton'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StickyModal } from '../Modals/StickyModal'
import { Button } from '../Controls/Button'
import { WalletService, ProofableLogin } from '../../services/wallet'
import { _ProviderSelector } from './_ProviderSelector'
import { _ProviderConnector } from './_ProviderConnector'

let StaticWalletService: IWalletService | null = null

type Props = {
  walletConfig: WalletServiceConfig
  onTokenRequest: () => Promise<string>
  onLocalLogin: (proofable: ProofableLogin) => void
  forceOpen?: boolean
}

export const ConnectButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState(props.forceOpen || false)
  const [proofableToken, setProofableToken] = useState<string | null>(null)
  const [activeConnector, setActiveConnector] = useState<WalletProviderId | null>(null)

  useEffect(() => {
    if (!isOpen) return
    init()
  }, [isOpen])

  const init = async () => setProofableToken(await props.onTokenRequest())

  const handleLoginRequest = async (provider: WalletProviderId) => {
    if (!StaticWalletService) {
      StaticWalletService = new WalletService(provider, props.walletConfig)
      StaticWalletService.onLogin = (proof) => props.onLocalLogin(proof)
      await StaticWalletService.init()
    }

    if (provider === 'maiar_app') setActiveConnector(provider)
    if (provider === 'maiar_extension') handleLogin()
    if (provider === 'hardware') setActiveConnector(provider)
    if (provider === 'web') handleLogin()
  }

  const handleLogin = async () => {
    if (!proofableToken || !StaticWalletService) return
    await StaticWalletService.login(proofableToken)
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
        {!!activeConnector && StaticWalletService && proofableToken ? (
          <_ProviderConnector
            provider={activeConnector}
            wallet={StaticWalletService}
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

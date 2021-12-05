import type { IWalletService, WalletProviderId, WalletServiceConfig } from '../../services/wallet'
import type { AppSystemColor } from '../../types'
import React, { useEffect, useState } from 'react'
import { _ProviderButton } from './_ProviderButton'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StickyModal } from '../Modals/StickyModal'
import { Button } from '../Controls/Button'
import { ProofableLogin } from '../../services/wallet'
import { _ProviderSelector } from './_ProviderSelector'
import { _ProviderConnector } from './_ProviderConnector'

type Props = {
  walletConfig: WalletServiceConfig
  walletService: IWalletService
  onTokenRequest: () => Promise<string>
  onLocalLogin: (proofable: ProofableLogin) => void
  forceOpen?: boolean
  children?: any
  color?: AppSystemColor
  large?: boolean
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
    await props.walletService.init(props.walletConfig, provider)
    props.walletService.onLogin = (proof) => props.onLocalLogin(proof)

    if (provider === 'maiar_app') setActiveConnector(provider)
    if (provider === 'maiar_extension') await handleLogin()
    if (provider === 'hardware') setActiveConnector(provider)
    if (provider === 'web') handleLogin()
  }

  const handleLogin = async () => {
    if (!proofableToken) return
    await props.walletService.login(proofableToken)
    setIsOpen(false)
    setActiveConnector(null)
  }

  return (
    <>
      <Button color={props.color || 'blue'} onClick={() => setIsOpen(true)} large={props.large}>
        {props.children || (
          <>
            <FontAwesomeIcon icon={faBolt} className="inline-block mr-2 text-white opacity-75" />
            Connect
          </>
        )}
      </Button>
      <StickyModal open={isOpen} onClose={() => setIsOpen(false)}>
        {!!activeConnector && proofableToken ? (
          <_ProviderConnector
            provider={activeConnector}
            wallet={props.walletService}
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

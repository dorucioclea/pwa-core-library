import React from 'react'
import { _ProviderButton } from './_ProviderButton'
import { ElrondWebWalletLogo } from '../Logos/ElrondWebWalletLogo'
import { MaiarAppWalletLogo } from '../Logos/MaiarAppWalletLogo'
import { MaiarDefiWalletLogo } from '../Logos/MaiarDefiWalletLogo'
import { LedgerLogo } from '../Logos/LedgerLogo'
import { WalletProviderId } from '../../services/wallet'

const ElrondWalletSetupLinkUrl = 'https://testnet-wallet.elrond.com/create'

type Props = {
  onLoginRequest: (provider: WalletProviderId) => void
  disabledProviders?: WalletProviderId[]
}

export const _ProviderSelector = (props: Props) => {
  const isEnabled = (id: WalletProviderId) => !props.disabledProviders || !props.disabledProviders.includes(id)

  return (
    <div>
      {isEnabled('maiar_extension') && (
        <_ProviderButton gradientClassName={['from-blue-500', 'to-blue-300']} onClick={() => props.onLoginRequest('maiar_extension')}>
          <MaiarDefiWalletLogo white className="h-6 mr-4" />
          Maiar DeFi Wallet
        </_ProviderButton>
      )}
      {isEnabled('maiar_app') && (
        <_ProviderButton gradientClassName={['from-blue-500', 'to-blue-600']} onClick={() => props.onLoginRequest('maiar_app')}>
          <MaiarAppWalletLogo white className="w-6 h-6 mr-4" />
          Maiar App
        </_ProviderButton>
      )}
      {isEnabled('hardware') && (
        <_ProviderButton gradientClassName={['from-gray-700', 'to-gray-900']} onClick={() => props.onLoginRequest('hardware')}>
          <LedgerLogo white className="w-6 h-6 mr-4" />
          Ledger
        </_ProviderButton>
      )}
      {isEnabled('web') && (
        <_ProviderButton gradientClassName={['from-gray-700', 'to-gray-500']} onClick={() => props.onLoginRequest('web')}>
          <ElrondWebWalletLogo white className="w-6 h-6 mr-4" />
          Elrond Web Wallet
        </_ProviderButton>
      )}
      <p className="text-xl text-gray-500 text-center leading-tight mt-8">
        <strong className="block">New to Elrond Blockchain?</strong>
        <a href={ElrondWalletSetupLinkUrl} target="_blank" className="text-base">
          Learn How to setup a wallet
        </a>
      </p>
    </div>
  )
}

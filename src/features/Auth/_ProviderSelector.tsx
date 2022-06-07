import React from 'react'
import { MaiarLogo } from '../Logos/MaiarLogo'
import { LedgerLogo } from '../Logos/LedgerLogo'
import { _ProviderButton } from './_ProviderButton'
import { WalletProviderId } from '../../services/wallet'
import { MaiarAppWalletLogo } from '../Logos/MaiarAppWalletLogo'
import { ElrondWebWalletLogo } from '../Logos/ElrondWebWalletLogo'
import { MaiarDefiWalletLogo } from '../Logos/MaiarDefiWalletLogo'

const ElrondWalletSetupLinkUrl = 'https://maiar.com'

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
        <a href={ElrondWalletSetupLinkUrl} target="_blank" className="flex justify-center items-center text-xl text-blue-500" style={{ border: 0 }}>
          Easily create your own Elrond wallet using Maiar
          <span className="inline-block ml-2">
            <MaiarLogo className="w-6" />
          </span>
        </a>
      </p>
    </div>
  )
}

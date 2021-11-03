import React from 'react'
import { _ProviderButton } from './_ProviderButton'
import { MaiarLogo } from '../Logos/MaiarLogo'
import { ElrondLogo } from '../Logos/ElrondLogo'
import { LedgerLogo } from '../Logos/LedgerLogo'
import { WalletProviderId } from '../../services/wallet'

const ElrondWalletSetupLinkUrl = 'https://testnet-wallet.elrond.com/create'

type Props = {
  onLoginRequest: (provider: WalletProviderId) => void
}

export const _ProviderSelector = (props: Props) => (
  <div>
    <_ProviderButton gradientClassName={['from-blue-500', 'to-blue-600']} onClick={() => props.onLoginRequest('maiar_app')}>
      <MaiarLogo white className="w-6 h-6 mr-4" />
      Maiar App
    </_ProviderButton>
    <_ProviderButton gradientClassName={['from-blue-500', 'to-blue-300']} onClick={() => props.onLoginRequest('maiar_extension')}>
      <MaiarLogo white className="w-6 h-6 mr-4" />
      Maiar Browser
    </_ProviderButton>
    <_ProviderButton gradientClassName={['from-gray-700', 'to-gray-900']} onClick={() => props.onLoginRequest('hardware')}>
      <LedgerLogo white className="w-6 h-6 mr-4" />
      Ledger
    </_ProviderButton>
    <_ProviderButton gradientClassName={['from-gray-700', 'to-gray-500']} onClick={() => props.onLoginRequest('web')}>
      <ElrondLogo white className="w-6 h-6 mr-4" />
      Web Wallet
    </_ProviderButton>
    <p className="text-xl text-gray-500 text-center leading-tight mt-8">
      <strong className="block">New to Elrond Blockchain?</strong>
      <a href={ElrondWalletSetupLinkUrl} target="_blank" className="text-base">
        Learn How to setup a wallet
      </a>
    </p>
  </div>
)

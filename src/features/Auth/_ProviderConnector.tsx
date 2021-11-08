import React from 'react'
import { IWalletService } from '../../services/wallet'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { WalletProviderId } from '../../services/wallet'
import { _HardwareConnector } from './connectors/_HardwareConnector'
import { _MaiarAppConnector } from './connectors/_MaiarAppConnector'

type Props = {
  provider: WalletProviderId
  wallet: IWalletService
  proofableToken: string
  onCloseRequest: () => void
}

export const _ProviderConnector = (props: Props) => {
  const ConnectorContent = () => {
    if (props.provider === 'maiar_app') return <_MaiarAppConnector wallet={props.wallet} proofableToken={props.proofableToken} />
    if (props.provider === 'hardware') return <_HardwareConnector wallet={props.wallet} proofableToken={props.proofableToken} />
    return null
  }

  return (
    <div>
      <header>
        <button onClick={props.onCloseRequest} className="py-2 px-4 rounded-xl">
          <FontAwesomeIcon icon={faChevronLeft} className="text-blue-400" />
          <span className="text-blue-400 text-xl inline-block ml-2">Go back</span>
        </button>
      </header>
      <ConnectorContent />
    </div>
  )
}

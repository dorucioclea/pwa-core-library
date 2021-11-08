import React, { useState } from 'react'
import _LedgerDevice from './_LedgerDevice'
import { Button } from '../../Controls/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { IWalletService } from '../../../services/wallet'
import { trimHash } from '../../../helpers'
import { EllipsisLoader } from '../../Loaders/EllipsisLoader'

type Props = {
  proofableToken: string
  wallet: IWalletService
}

export const _HardwareConnector = (props: Props) => {
  const [activeErrorText, setActiveErrorText] = useState<string | null>(null)
  const [isSelectingAccount, setIsSelectingAccount] = useState(false)
  const [availableAccounts, setAvailableAccounts] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleAccountSelectionRequest = async () => {
    try {
      setIsLoading(true)
      const available = await props.wallet.getHardwareAccounts()
      setIsLoading(false)
      setIsSelectingAccount(true)
      setAvailableAccounts(available)
    } catch (e) {
      setIsLoading(false)
      setActiveErrorText('Check if Elrond app is open on Ledger')
    }
  }

  const handleLoginRequest = async (addressIndex: number) => {
    try {
      setIsLoading(true)
      await props.wallet.login(props.proofableToken)
      setIsLoading(false)
      setIsSelectingAccount(false)
      setAvailableAccounts([])
    } catch (e) {
      setIsLoading(false)
      setActiveErrorText('Check if Elrond app is open on Ledger')
    }
  }

  return isSelectingAccount && availableAccounts ? (
    <div>
      <div className="flex justify-between mb-2">
        {isLoading ? (
          <span className="highlight text-xl font-head">Check your device</span>
        ) : (
          <h2 className="text-xl text-gray-800">Your top 10 wallets</h2>
        )}
        {isLoading && <EllipsisLoader className="w-12" />}
      </div>
      <ul>
        {availableAccounts.map((address, index) => (
          <li key={address}>
            <button
              onClick={() => handleLoginRequest(index)}
              className="flex justify-between items-center text-xl w-full bg-gray-50 px-6 py-3 mb-2 rounded-lg"
            >
              <span className="font-head text-gray-800">{index + 1 + '. '}</span>
              <span>{trimHash(address, 20)}</span>
              <FontAwesomeIcon icon={faAngleRight} className="text-gray-400" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="text-center">
      <div className="relative flex justify-center mb-4">
        <_LedgerDevice />
        {isLoading && <EllipsisLoader className="w-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
      </div>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-gray-400 to-gray-900 mb-2">Ledger Login</h2>
      <p className="text-xl text-gray-600 mb-8">
        Unlock your device & <span className="highlight">open the Elrond App</span>.
      </p>
      <Button color="gray" onClick={handleAccountSelectionRequest}>
        <span className="inline-block mr-2">Connect to waiting Ledger</span>
        <FontAwesomeIcon icon={faAngleRight} className="text-gray-400" />
      </Button>
      {activeErrorText && <span className="block text-red-500 my-4">{activeErrorText}</span>}
    </div>
  )
}

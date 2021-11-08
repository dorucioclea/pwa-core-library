import React, { useEffect, useState } from 'react'
import QrCode from 'qrcode'
import { IWalletService } from '../../../services/wallet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

type Props = {
  proofableToken: string
  wallet: IWalletService
}

export const _MaiarAppConnector = (props: Props) => {
  const [wcUri, setWcUri] = useState('')
  const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null)
  const preparedWalletConnectDeepLink = `${props.wallet.getConfig().WalletConnectDeepLink}?wallet-connect=${encodeURIComponent(wcUri)}`

  const generateLoginUri = async () => {
    const { walletConnectLoginUri } = await props.wallet.login(props.proofableToken)
    if (walletConnectLoginUri) setWcUri(walletConnectLoginUri)
  }

  useEffect(() => {
    generateLoginUri()
  }, [])

  const buildQrCode = async (uri: string) => setQrCodeSvg(await QrCode.toString(uri, { type: 'svg' }))

  useEffect(() => {
    if (!wcUri) return
    buildQrCode(wcUri)
  }, [wcUri])

  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">{qrCodeSvg && <figure dangerouslySetInnerHTML={{ __html: qrCodeSvg }} className="h-48 w-48" />}</div>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-600 mb-2">Maiar Login</h2>
      {props.wallet.isMobile() ? (
        <div>
          <p className="text-xl mb-4">Scan the QR code using Maiar or click the button below to open the App</p>
          <a
            href={preparedWalletConnectDeepLink}
            className="relative inline-flex justify-center items-center py-2 px-6 rounded-xl shadow text-xl text-white bg-blue-500"
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            <span className="inline-block mr-2">Open Maiar</span>
            <FontAwesomeIcon icon={faSignInAlt} className="text-blue-200" />
          </a>
        </div>
      ) : (
        <p className="text-xl">Scan the QR Code using Maiar</p>
      )}
    </div>
  )
}

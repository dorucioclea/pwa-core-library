import React, { useEffect, useState } from 'react'
import QrCode from 'qrcode'
import { WalletService } from '../../../services/wallet'

type Props = {
  proofableToken: string
  wallet: WalletService
}

export const _MaiarAppConnector = (props: Props) => {
  const [wcUri, setWcUri] = useState('')
  const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null)

  useEffect(() => {
    login()
  }, [])

  const buildQrCode = async (uri: string) => setQrCodeSvg(await QrCode.toString(uri, { type: 'svg' }))

  const login = async () => {
    const { walletConnectLoginUri } = await props.wallet.login(props.proofableToken)
    if (walletConnectLoginUri) setWcUri(walletConnectLoginUri)
  }

  useEffect(() => {
    if (!wcUri) return
    buildQrCode(wcUri)
  }, [wcUri])

  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">{qrCodeSvg && <figure dangerouslySetInnerHTML={{ __html: qrCodeSvg }} className="h-48 w-48" />}</div>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-600">Maiar Login</h2>
      <p className="text-xl">Scan the QR Code using Maiar</p>
    </div>
  )
}

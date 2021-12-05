import { WalletService, WalletServiceConfig } from '../src'
import { HttpService } from '../src/services/http'

const TestingApiBaseUrl = 'https://api.superciety.com'

export const getHttpService = () => {
  const httpService = new HttpService(TestingApiBaseUrl)

  httpService.onUnauthorized = () => alert('Unauthorized.')

  return httpService
}

const WalletConfig: WalletServiceConfig = {
  GatewayAddress: 'https://testnet-gateway.elrond.com',
  WebWalletUrl: 'https://testnet-wallet.elrond.com/dapp/init',
  WalletConnectBridge: 'https://bridge.walletconnect.org',
  WalletConnectDeepLink: 'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/',
}

export const getWalletService = () => {
  const wallet = WalletService.getInstance()
  wallet.init(WalletConfig)
  return wallet
}

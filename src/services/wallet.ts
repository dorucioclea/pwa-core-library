import platform from 'platform'
import {
  IDappProvider,
  ExtensionProvider,
  Transaction,
  IProvider,
  ProxyProvider,
  Address,
  Account,
  SignableMessage,
  WalletProvider as WebWalletProvider,
  WalletConnectProvider,
  HWProvider,
} from '@elrondnetwork/erdjs'

const WalletAuthStorageKey = 'wallet_user'

export type WalletProviderId = 'maiar_app' | 'maiar_extension' | 'hardware' | 'web' | 'empty'

export type WalletServiceConfig = {
  GatewayAddress: string
  WebWalletUrl: string
  WalletConnectBridge: string
}

export type ProofableLogin = {
  signature: string
  address: string
}

type SerializableProviderStorage = {
  providerId: WalletProviderId
  address: string
}

export interface IWalletService {
  onLogin?: (proofableLogin: ProofableLogin) => void
  onLogout?: () => void
  login: (proofableToken: string) => Promise<{ walletConnectLoginUri?: string }>
  logout: () => Promise<void>
  isLoggedIn: () => boolean
  sendTransaction: (transaction: Transaction) => Promise<Transaction>
  getAddress: () => string
  isMobile: () => boolean
}

export class WalletService implements IWalletService {
  public onLogin: (proofableLogin: ProofableLogin) => any
  public onLogout: () => any
  private providerId: WalletProviderId
  private provider: IDappProvider
  private proxy: IProvider | null
  private address: string | null

  constructor(providerId: WalletProviderId | null, config: WalletServiceConfig) {
    const storedWallet = this.loadFromStorage()
    const isLoggedIn = !!storedWallet
    const proxy = new ProxyProvider(config.GatewayAddress, { timeout: 5000 })

    providerId = providerId || storedWallet?.providerId || 'empty'

    if (providerId === 'maiar_app') {
      this.provider = new WalletConnectProvider(proxy, config.WalletConnectBridge, {
        onClientLogin: async () =>
          this.finalizeLogin({
            signature: await (this.provider as WalletConnectProvider).getSignature(),
            address: await (this.provider as WalletConnectProvider).getAddress(),
          }),
        onClientLogout: async () => this.logout(),
      })
    } else if (providerId === 'maiar_extension') {
      this.provider = isLoggedIn ? ExtensionProvider.getInstance().setAddress(storedWallet.address) : ExtensionProvider.getInstance()
    } else if (providerId === 'hardware') {
      this.provider = new HWProvider(proxy)
    } else if (providerId === 'web') {
      this.provider = new WebWalletProvider(config?.WebWalletUrl)
    } else {
      this.provider = new EmptyProvider()
    }

    this.onLogin = (_) => {}
    this.onLogout = () => {}
    this.providerId = providerId
    this.proxy = proxy
    this.address = isLoggedIn ? storedWallet.address : null

    this.provider.init()
  }

  // depending on the provider, login might be a 2-step process that ends by calling finalizeLogin()
  login = async (proofableToken: string) => {
    if (this.providerId === 'maiar_app') {
      const loginUri = await (this.provider as WalletConnectProvider).login()
      return { walletConnectLoginUri: loginUri + `&token=${proofableToken}` }
    }

    if (this.providerId === 'maiar_extension') {
      await this.provider.login({ token: proofableToken })
      const extensionAccount = (this.provider as ExtensionProvider).account
      this.finalizeLogin({ signature: extensionAccount.signature || '', address: extensionAccount.address })
    }

    if (this.providerId === 'hardware') {
      const login = await (this.provider as HWProvider).tokenLogin({ token: Buffer.from(`${proofableToken}{}`), addressIndex: 0 })
      this.finalizeLogin({ signature: login.signature.hex(), address: login.address })
    }

    return {}
  }

  logout = async () => {
    await this.provider.logout()
    this.clearStorage()
    this.onLogout()
  }

  isLoggedIn = () => !!window.localStorage.getItem(WalletAuthStorageKey)

  sendTransaction = async (transaction: Transaction) => {
    this.assertLoggedIn()
    this.assertConfiguredProxy()

    const address = new Address(this.getAddress())
    const account = new Account(address)

    account.getAsOnNetwork(this.proxy as IProvider)
    account.incrementNonce()
    transaction.setNonce(account.nonce)

    const sent = await this.provider.sendTransaction(transaction)

    return sent
  }

  getAddress = () => {
    this.assertLoggedIn()
    return this.address as string
  }

  isMobile = () => platform.os?.family === 'iOS' || platform.os?.family === 'Android'

  private finalizeLogin = (proofableLogin: ProofableLogin) => {
    this.persistLoginInStorage(proofableLogin.address)
    this.onLogin(proofableLogin)
  }

  private persistLoginInStorage = (address: string) => {
    const serializableStorage: SerializableProviderStorage = {
      providerId: this.providerId,
      address: address,
    }
    window.localStorage.setItem(WalletAuthStorageKey, JSON.stringify(serializableStorage))
  }

  private loadFromStorage = () => {
    const serialized = window.localStorage.getItem(WalletAuthStorageKey)
    return !!serialized ? (JSON.parse(serialized) as SerializableProviderStorage) : null
  }

  private clearStorage = () => window.localStorage.removeItem(WalletAuthStorageKey)

  public walletConnectHeartbeat = () => {
    if (this.providerId === 'maiar_app') return

    const wc = this.provider as WalletConnectProvider
    const isSafari = wc.walletConnector?.peerMeta?.description.match(/(iPad|iPhone|iPod)/g)

    if (!wc.walletConnector?.connected || isSafari) return

    wc.sendCustomMessage({ method: 'heartbeat', params: {} }).catch(async (e: any) => {
      console.error('wallet connect: connection lost', e)
      await this.logout()
    })
  }

  private assertLoggedIn = () => {
    if (!this.address) {
      throw new Error('wallet: user needs to login before')
    }
  }

  private assertConfiguredProxy = () => {
    if (!this.proxy) {
      throw new Error('wallet: proxy needs configuration')
    }
  }
}

class EmptyProvider implements IDappProvider {
  init = () => new Promise<boolean>((resolve) => resolve(true))
  login = () => new Promise<string>((resolve) => resolve(''))
  logout = () => new Promise<boolean>((resolve) => resolve(true))
  getAddress = () => new Promise<string>((resolve) => resolve(''))
  isInitialized = () => true
  isConnected = () => new Promise<boolean>((resolve) => resolve(true))
  sendTransaction = () => new Promise<Transaction>((resolve) => resolve(new Transaction({ receiver: new Address('erd1Empty') })))
  signTransaction = () => new Promise<Transaction>((resolve) => resolve(new Transaction({ receiver: new Address('erd1Empty') })))
  signTransactions = () => new Promise<Array<Transaction>>((resolve) => resolve([new Transaction({ receiver: new Address('erd1Empty') })]))
  signMessage = () => new Promise<SignableMessage>((resolve) => resolve(new SignableMessage({})))
}

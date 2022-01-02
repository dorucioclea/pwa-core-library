import platform from 'platform'
import { BlockchainNetwork } from '../types'
import {
  IDappProvider,
  ExtensionProvider,
  Transaction,
  ProxyProvider,
  Address,
  Account,
  SignableMessage,
  WalletProvider as WebWalletProvider,
  WalletConnectProvider,
  HWProvider,
  ChainID,
} from '@elrondnetwork/erdjs'

const WalletAuthStorageKey = 'wallet_user'

export type WalletProviderId = 'maiar_app' | 'maiar_extension' | 'hardware' | 'web' | 'empty'

export type WalletServiceConfig = {
  ApiAddress: string
  GatewayAddress: string
  WebWalletUrl: string
  WalletConnectBridge: string
  WalletConnectDeepLink: string
  Network: BlockchainNetwork
}

export type ProofableLogin = {
  signature: string
  address: string
}

type SerializableProviderStorage = {
  providerId: WalletProviderId
  address: string
  addressIndex?: number
}

export interface IWalletService {
  init: (config: WalletServiceConfig, providerId?: WalletProviderId) => Promise<boolean>
  getConfig: () => WalletServiceConfig
  onLogin?: (proofableLogin: ProofableLogin) => void
  onLogout?: () => void
  login: (proofableToken: string, addressIndex?: number) => Promise<{ walletConnectLoginUri?: string }>
  logout: () => Promise<void>
  isLoggedIn: () => boolean
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  sendTransaction: (transaction: Transaction) => Promise<Transaction>
  heartbeat: () => Promise<void>
  getAddress: () => string
  getProvider: () => IDappProvider
  getProviderId: () => WalletProviderId
  getChainId: () => ChainID
  getProxy: () => ProxyProvider
  isMobile: () => boolean
  getHardwareAccounts: () => Promise<string[]>
}

class EmptyProvider implements IDappProvider {
  constructor() {}
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

export class WalletService implements IWalletService {
  public onLogin?: (proofableLogin: ProofableLogin) => any
  public onLogout?: () => any
  private static _instance: WalletService = new WalletService()
  private provider: IDappProvider = new EmptyProvider()
  private providerId: WalletProviderId = 'empty'
  private config: WalletServiceConfig | null = null
  private proxy: ProxyProvider | null = null
  private address: string | null = null

  constructor() {
    if (WalletService._instance) {
      throw new Error('use getInstance() for construction of wallet service')
    }
    WalletService._instance = this
  }

  public static getInstance(): WalletService {
    return WalletService._instance
  }

  init = async (config: WalletServiceConfig, providerId?: WalletProviderId) => {
    if (this.providerId !== 'empty' && !providerId) return true // prevent empty init if already set provider
    if (this.providerId === providerId) return true // prevent double-init for same provider

    const storedWallet = this.loadFromStorage()
    const proxy = new ProxyProvider(config.GatewayAddress, { timeout: 5000 })
    providerId = providerId || storedWallet?.providerId || 'empty'

    if (providerId === 'maiar_app') {
      this.provider = new WalletConnectProvider(proxy, config.WalletConnectBridge, {
        onClientLogin: async () => {
          const castedProvider = this.provider as WalletConnectProvider
          this.finalizeLogin({ signature: await castedProvider.getSignature(), address: await castedProvider.getAddress() })
        },
        onClientLogout: async () => this.logout(),
      })
    } else if (providerId === 'maiar_extension') {
      this.provider = !!storedWallet ? ExtensionProvider.getInstance().setAddress(storedWallet.address) : ExtensionProvider.getInstance()
    } else if (providerId === 'hardware') {
      this.provider = new HWProvider(proxy)
    } else if (providerId === 'web') {
      this.provider = new WebWalletProvider(config.WebWalletUrl)
    }

    this.providerId = providerId
    this.config = config
    this.proxy = proxy
    this.address = !!storedWallet ? storedWallet.address : null

    return await this.provider.init()
  }

  getConfig = () => {
    this.ensureInitialized()
    return this.config!
  }

  // depending on the provider, login might be a 2-step process that ends by calling finalizeLogin()
  login = async (proofableToken: string, addressIndex?: number) => {
    this.ensureInitialized()

    if (this.providerId === 'maiar_app') {
      const loginUri = await (this.provider as WalletConnectProvider).login()
      return { walletConnectLoginUri: loginUri + `&token=${proofableToken}` }
    }

    if (this.providerId === 'maiar_extension') {
      const extensionProvider = this.provider as ExtensionProvider
      await extensionProvider.login({ token: proofableToken })
      const extensionAccount = extensionProvider.account
      this.finalizeLogin({ signature: extensionAccount.signature || '', address: extensionAccount.address })
    }

    if (this.providerId === 'hardware') {
      const login = await (this.provider as HWProvider).tokenLogin({ token: Buffer.from(`${proofableToken}{}`), addressIndex: addressIndex })
      this.finalizeLogin({ signature: login.signature.hex(), address: login.address }, addressIndex)
    }

    if (this.providerId === 'web') {
      this.provider.login({ token: proofableToken })
    }

    return {}
  }

  logout = async () => {
    this.ensureInitialized()
    await this.provider.logout()
    this.clearStorage()
    if (this.onLogout) this.onLogout()
  }

  isLoggedIn = () => typeof window !== 'undefined' && !!window.localStorage.getItem(WalletAuthStorageKey)

  signTransaction = async (tx: Transaction) => {
    this.ensureLoggedIn()
    this.ensureInitialized()

    const address = new Address(this.getAddress())
    const account = new Account(address)
    await account.sync(this.proxy!)
    tx.setNonce(account.nonce)

    return await this.provider.signTransaction(tx)
  }

  sendTransaction = async (tx: Transaction) => {
    this.ensureLoggedIn()
    this.ensureInitialized()
    tx.getSignature() // tx does not expose a way to check if sig is applied, so using it as a guard

    await tx.send(this.proxy!)
    await tx.awaitExecuted(this.proxy!)

    return tx
  }

  heartbeat = async () => {
    if (this.providerId === 'maiar_app') {
      const wc = this.provider as WalletConnectProvider
      const isSafari = wc.walletConnector?.peerMeta?.description.match(/(iPad|iPhone|iPod)/g)

      if (!wc.walletConnector?.connected || isSafari) return

      try {
        await wc.sendCustomMessage({ method: 'heartbeat', params: {} })
      } catch (e) {
        console.error('wallet connect: connection lost', e)
        await this.logout()
      }
    }

    // ... space for other provider's heartbeats
  }

  getAddress = () => {
    this.ensureLoggedIn()
    return this.address as string
  }

  getProvider = () => this.provider

  getProviderId = () => this.providerId

  getChainId = () => {
    this.ensureInitialized()
    if (this.config!.Network === 'devnet') return new ChainID('D')
    if (this.config!.Network === 'testnet') return new ChainID('T')
    return new ChainID('1')
  }

  getProxy = () => this.proxy!

  isMobile = () => platform.os?.family === 'iOS' || platform.os?.family === 'Android'

  getHardwareAccounts = async () => {
    if (this.providerId !== 'hardware') return []
    return await (this.provider as HWProvider).getAccounts()
  }

  private finalizeLogin = (proofableLogin: ProofableLogin, addressIndex?: number) => {
    this.persistLoginInStorage(proofableLogin.address, addressIndex)
    this.address = proofableLogin.address
    if (this.onLogin) this.onLogin(proofableLogin)
  }

  private persistLoginInStorage = (address: string, addressIndex?: number) => {
    const serializableStorage: SerializableProviderStorage = {
      providerId: this.providerId,
      address: address,
      addressIndex: addressIndex,
    }
    window.localStorage.setItem(WalletAuthStorageKey, JSON.stringify(serializableStorage))
  }

  private loadFromStorage = () => {
    if (typeof window === 'undefined') return null
    const serialized = window.localStorage.getItem(WalletAuthStorageKey)
    return !!serialized ? (JSON.parse(serialized) as SerializableProviderStorage) : null
  }

  private clearStorage = () => window.localStorage.removeItem(WalletAuthStorageKey)

  private ensureLoggedIn = () => {
    if (!this.address) {
      throw new Error('wallet user needs to login before')
    }
  }

  private ensureInitialized = () => {
    if (this.providerId === 'empty') {
      throw new Error('wallet not initialized. call init() first')
    }
    if (!this.proxy) {
      throw new Error('wallet >proxy< needs configuration')
    }
  }
}

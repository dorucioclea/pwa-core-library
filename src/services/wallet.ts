import platform from 'platform'
import BigNumber from 'bignumber.js'
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
  ApiProvider,
  Balance,
  Token,
  ApiNetworkProvider,
} from '@elrondnetwork/erdjs'
import { INetworkProvider } from '@elrondnetwork/erdjs/out/networkProvider/interface'

const WalletAuthStorageKey = 'wallet_user'

export type WalletProviderId = 'maiar_app' | 'maiar_extension' | 'hardware' | 'web' | 'empty'

export type WalletServiceConfig = {
  ApiAddress: string
  GatewayAddress: string
  WebWalletUrl: string
  WalletConnectBridge: string
  WalletConnectDeepLink: string
  Explorer: string
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
  finalizeLogin: (proofableLogin: ProofableLogin, addressIndex?: number) => void
  logout: () => Promise<void>
  isLoggedIn: () => boolean
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  sendTransaction: (transaction: Transaction) => Promise<Transaction>
  heartbeat: () => Promise<void>
  getAddress: () => string
  getProvider: () => IDappProvider
  getProviderId: () => WalletProviderId
  getProxy: () => ProxyProvider
  getApi: () => ApiProvider
  getNetworkProvider: () => INetworkProvider
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
  private api: ApiProvider | null = null
  private networkProvider: INetworkProvider | null = null
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
    const api = new ApiProvider(config.ApiAddress, { timeout: 5000 })
    const networkProvider = new ApiNetworkProvider(config.ApiAddress, { timeout: 5000 })
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
    this.api = api
    this.networkProvider = networkProvider
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
      const login = await (this.provider as HWProvider).tokenLogin({
        token: Buffer.from(`${proofableToken}{}`),
        addressIndex: addressIndex,
      })
      this.finalizeLogin({ signature: login.signature.hex(), address: login.address }, addressIndex)
    }

    if (this.providerId === 'web') {
      // currently there is a bug in erdjs / web wallet that incorrectly encodes query params in the callback url,
      // so strip them in the callback url entirely for now
      const callbackUrl = location.protocol + '//' + location.host + location.pathname
      this.provider.login({ token: proofableToken, callbackUrl })
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

    await this.ensureAccountHasSufficientBalanceFor(tx, account)

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

  getProxy = () => this.proxy!

  getApi = () => this.api!

  getNetworkProvider = () => this.networkProvider!

  isMobile = () => platform.os?.family === 'iOS' || platform.os?.family === 'Android'

  getHardwareAccounts = async () => {
    if (this.providerId !== 'hardware') return []
    return await (this.provider as HWProvider).getAccounts()
  }

  finalizeLogin = (proofableLogin: ProofableLogin, addressIndex?: number) => {
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
      throw new Error('wallet proxy needs configuration')
    }
  }

  private ensureAccountHasSufficientBalanceFor = async (tx: Transaction, account: Account) => {
    const accountBalance = account.balance.valueOf()
    const txValue = tx.getValue().valueOf()
    const isEgld = tx.getValue().isEgld()
    const isEsdtTransfer = tx.getData().getEncodedArguments()[0] === 'ESDTTransfer'
    const txData = tx.getData().getRawArguments()
    const tokenId = txData[1]?.toString()
    const tokenAmount = new BigNumber(txData[2]?.toString('hex'), 16)

    if (isEgld && accountBalance.isLessThan(txValue)) {
      const displayValue = +parseFloat(tx.getValue().toDenominated()).toFixed(4)
      throw new Error(`insufficient balance: ${displayValue} EGLD needed`)
    }

    if (isEsdtTransfer && tokenId && tokenAmount) {
      let balanceValue = 0
      let decimals = 18
      try {
        // TODO: refactor when this PR is packaged in new npm version: https://github.com/ElrondNetwork/elrond-sdk-erdjs/pull/133
        const networkTokenRes = await this.api!.doGetGeneric(`accounts/${this.address!}/tokens/${tokenId}`, (r) => r)
        balanceValue = networkTokenRes.balance
        decimals = networkTokenRes.decimals
      } catch {}

      const token = new Token({ decimals })
      const balance = new Balance(token, new BigNumber(0), new BigNumber(balanceValue))
      if (balance.valueOf().isLessThan(tokenAmount)) {
        const displayValue = +tokenAmount.shiftedBy(-decimals).toFixed(4)
        throw new Error(`insufficient balance: ${displayValue} ${tokenId.split('-')[0]} needed`)
      }
    }
  }
}

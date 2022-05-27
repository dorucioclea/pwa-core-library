import platform from 'platform'
import BigNumber from 'bignumber.js'
import { HWProvider } from '@elrondnetwork/erdjs-hw-provider'
import { TransactionDecoder } from '@elrondnetwork/transaction-decoder'
import { ExtensionProvider } from '@elrondnetwork/erdjs-extension-provider'
import { ApiNetworkProvider } from '@elrondnetwork/erdjs-network-providers'
import { WalletConnectProvider } from '@elrondnetwork/erdjs-wallet-connect-provider'
import { Transaction, Address, Account, TransactionWatcher, ITransactionOnNetwork, TokenPayment } from '@elrondnetwork/erdjs'

const WalletAuthStorageKey = 'wallet_user'

export type WalletProviderId = 'maiar_app' | 'maiar_extension' | 'hardware' | 'web' | 'empty'

export type WalletServiceConfig = {
  ApiAddress: string
  WebWalletUrl: string
  WalletConnectBridge: string
  WalletConnectDeepLink: string
  Explorer: string
  ChainId: 'D' | 'T' | '1'
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
  sendTransaction: (transaction: Transaction) => Promise<ITransactionOnNetwork>
  getAddress: () => string
  getProviderId: () => WalletProviderId
  getNetworkProvider: () => ApiNetworkProvider
  isMobile: () => boolean
  getHardwareAccounts: () => Promise<string[]>
}

export class WalletService implements IWalletService {
  public onLogin?: (proofableLogin: ProofableLogin) => any
  public onLogout?: () => any
  private static _instance: WalletService = new WalletService()
  private provider: any
  private providerId: WalletProviderId = 'empty'
  private config: WalletServiceConfig | null = null
  private networkProvider: ApiNetworkProvider | null = null
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
    const networkProvider = new ApiNetworkProvider(config.ApiAddress, { timeout: 5000 })
    providerId = providerId || storedWallet?.providerId || 'empty'
    config.ChainId = config.ChainId || '1'

    if (providerId === 'maiar_app') {
      this.provider = new WalletConnectProvider(config.WalletConnectBridge, {
        onClientLogin: async () => {
          const castedProvider = this.provider as WalletConnectProvider
          this.finalizeLogin({ signature: await castedProvider.getSignature(), address: await castedProvider.getAddress() })
        },
        onClientLogout: async () => this.logout(),
      })
    } else if (providerId === 'maiar_extension') {
      this.provider = !!storedWallet ? ExtensionProvider.getInstance().setAddress(storedWallet.address) : ExtensionProvider.getInstance()
    } else if (providerId === 'hardware') {
      this.provider = new HWProvider()
    } else if (providerId === 'web') {
      // this.provider = new WalletProvider(config.WebWalletUrl) // TODO: properly implement web wallet
    }

    this.providerId = providerId
    this.config = config
    this.networkProvider = networkProvider
    this.address = !!storedWallet ? storedWallet.address : null

    return await this.provider?.init()
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
    account.update(await this.networkProvider!.getAccount(address))

    await this.ensureAccountHasSufficientBalanceFor(tx, account)

    tx.setNonce(account.nonce)

    return await this.provider.signTransaction(tx)
  }

  sendTransaction = async (tx: Transaction) => {
    this.ensureLoggedIn()
    this.ensureInitialized()

    await this.networkProvider!.sendTransaction(tx)

    let watcher = new TransactionWatcher(this.networkProvider!)
    let transactionOnNetwork = await watcher.awaitCompleted(tx)

    return transactionOnNetwork
  }

  getAddress = () => {
    this.ensureLoggedIn()
    return this.address as string
  }

  getProvider = () => this.provider

  getProviderId = () => this.providerId

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
      throw new Error('wallet: user needs to login before')
    }
  }

  private ensureInitialized = () => {
    if (this.providerId === 'empty') {
      throw new Error('wallet: not initialized')
    }
    if (!this.networkProvider) {
      throw new Error('wallet: network provider needs configuration')
    }
  }

  private ensureAccountHasSufficientBalanceFor = async (tx: Transaction, account: Account) => {
    const accountBalance = new BigNumber(account.balance.toString())
    const txValue = new BigNumber(tx.getValue().toString())
    const isEgld = !txValue.isZero()
    const metadata = new TransactionDecoder().getTransactionMetadata({
      sender: tx.getSender().bech32(),
      receiver: tx.getReceiver().bech32(),
      data: tx.getData().encoded(),
      value: tx.getValue().toString(),
      type: '',
    })

    if (isEgld && accountBalance.isLessThan(txValue)) {
      const dislayAmount = +parseFloat(TokenPayment.egldFromBigInteger(txValue).toPrettyString())
      throw new Error(`insufficient balance: ${dislayAmount} EGLD needed`)
    }

    if (metadata.transfers && metadata.transfers.length > 0) {
      const transfer = metadata.transfers[0]
      const transferTokenId = transfer.properties?.identifier!
      const transferTokenAmount = new BigNumber(transfer.value.toString())

      let networkTokenRes = null

      try {
        networkTokenRes = await this.networkProvider!.doGetGeneric(`accounts/${this.address!}/tokens/${transferTokenId}`)
      } catch (e) {
        throw new Error(`did not find ${transferTokenId} in your wallet`)
      }

      const balance = new BigNumber(networkTokenRes?.balance || '0')

      if (balance.isLessThan(transferTokenAmount)) {
        const dislayAmount = +parseFloat(TokenPayment.fungibleFromBigInteger(transferTokenId, transferTokenAmount, 18).toPrettyString())
        const displayToken = transferTokenId.split('-')[0]
        throw new Error(`insufficient balance: ${dislayAmount} ${displayToken} needed`)
      }
    }
  }
}

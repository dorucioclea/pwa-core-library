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
} from '@elrondnetwork/erdjs'

const WalletAuthStorageKey = 'wallet_user'

export type WalletProviderId = 'maiar_app' | 'maiar_extension' | 'hardware' | 'web' | 'empty'

export type WalletServiceConfig = {
  GatewayAddress: string
  WebWalletUrl: string
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
  login: (proofableToken: string) => Promise<ProofableLogin | null>
  logout: () => Promise<void>
  isLoggedIn: () => boolean
  sendTransaction: (transaction: Transaction) => Promise<Transaction>
  getAddress: () => string
}

export class WalletService implements IWalletService {
  private providerId: WalletProviderId
  private provider: IDappProvider
  private proxy: IProvider | null // Proxy in Erdjs will be deprecated soon in favor or API
  private address: string | null = null

  constructor(providerId: WalletProviderId | null, config: WalletServiceConfig) {
    const storedWallet = this.loadFromStorage()
    const isLoggedIn = !!storedWallet
    const finalProviderId = providerId || storedWallet?.providerId || 'empty'

    if (finalProviderId === 'maiar_extension') {
      this.provider = isLoggedIn ? ExtensionProvider.getInstance().setAddress(storedWallet.address) : ExtensionProvider.getInstance()
    } else if (finalProviderId === 'web') {
      this.provider = new WebWalletProvider(config?.WebWalletUrl)
    } else {
      this.provider = new EmptyProvider()
    }

    this.providerId = finalProviderId
    this.provider.init()
    this.proxy = !!config ? new ProxyProvider(config.GatewayAddress, { timeout: 10000 }) : null

    if (isLoggedIn) {
      this.address = storedWallet.address
    }
  }

  login = async (proofableToken: string) => {
    await this.provider.login({ token: proofableToken })

    // the web wallet provider redirects to a web wallet hook,
    // and therefore exits the above login function
    if (this.providerId === 'web') {
      return null
    }

    const { signature, address } = (this.provider as any).account

    this.persistLoginInStorage(address)

    return { signature, address }
  }

  logout = async () => {
    await this.provider.logout()
    this.clearStorage()
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

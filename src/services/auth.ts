import { IDappProvider, ExtensionProvider } from '@elrondnetwork/erdjs'

export type AuthWalletProvider = 'extension'

export type ProofableLogin = {
  signature: string
  address: string
}

export interface IAuthService {
  login: (proofableToken: string) => Promise<ProofableLogin>
}

export class ElrondAuthService implements IAuthService {
  private walletProvider: IDappProvider

  constructor(provider: AuthWalletProvider) {
    if (provider === 'extension') {
      this.walletProvider = ExtensionProvider.getInstance()
    } else {
      this.walletProvider = ExtensionProvider.getInstance()
    }

    this.walletProvider.init()
  }

  login = async (proofableToken: string) => {
    await this.walletProvider.login({ token: proofableToken })

    // so dirty, if not done by elrond, send a PR that unifies the account prop or getter method across providers
    // - this currently only works for the extension provider, meh
    const { signature, address } = (this.walletProvider as any).account

    return { signature, address }
  }
}

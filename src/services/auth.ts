import { IHttpService } from '../services/http'
import { storeAuthRequest } from '../features/Auth/api'
import { UserPrivate } from '../features/User/types'
import { ICryptoService, ElrondCryptoService, ElrondWalletProvider } from './crypto'

export interface IAuthService {
  login: () => Promise<UserPrivate | null>
}

export class ElrondAuthService {
  private http: IHttpService
  private crypto: ICryptoService

  constructor(http: IHttpService, provider: ElrondWalletProvider) {
    this.http = http
    this.crypto = new ElrondCryptoService(provider)
  }

  login = async () => {
    const addressBech32 = await this.crypto.getProvider().login()
    const signableProof = 'superciety-authentiation-proof'
    const signedMessage = await this.crypto.signMessage(signableProof, addressBech32)
    const authRes = await storeAuthRequest(this.http, signedMessage.message, signedMessage.signature, addressBech32)

    return authRes.ok ? authRes.data : null
  }
}

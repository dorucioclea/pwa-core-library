import { IHttpService } from '../../services/http'
import { UserPrivate } from '../User/types'

export const storeAuthRequest = async (http: IHttpService, message: string, signature: string, signer: string) =>
  await http.post<UserPrivate>('auth', { message, signature, signer })

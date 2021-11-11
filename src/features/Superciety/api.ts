import { IHttpService } from '../../services/http'
import { NftCollectionList } from '../Tokens/types'
import { ScyIdentity } from './types'

export const getScyIdentityRequest = async (http: IHttpService, id: string) => await http.get<ScyIdentity>(`identity/${id}`)

export const getScyNftsByUserRequest = async (http: IHttpService, userId: string) => await http.get<NftCollectionList>(`nfts?owner=${userId}`)

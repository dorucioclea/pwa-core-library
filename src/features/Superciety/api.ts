import { IHttpService } from '../../services/http'
import { NftCollectionList } from '../Tokens/types'
import { SCY_Identity } from './types'

export const getScyIdentityRequest = async (http: IHttpService, id: string) => await http.get<SCY_Identity>(`identity/${id}`)

export const getScyNftsRequest = async (http: IHttpService, id: string) => await http.get<NftCollectionList>(`nfts/${id}`)

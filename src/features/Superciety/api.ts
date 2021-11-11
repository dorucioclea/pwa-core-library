import { IHttpService } from '../../services/http'
import { NftCollectionList } from '../Tokens/types'
import { ScyIdentity } from './types'
import { Nft, TokenIdentifier } from '../Tokens/types'
import { Transaction } from '../Transactions/types'

export const getScyIdentityRequest = async (http: IHttpService, id: string) => await http.get<ScyIdentity>(`identity/${id}`)

export const getScyNftsByUserRequest = async (http: IHttpService, userId: string) => await http.get<NftCollectionList>(`nfts?owner=${userId}`)

export const getScyNftRequest = async (httpService: IHttpService, id: TokenIdentifier) => await httpService.get<Nft>(`nfts/${id}`)

export const getScyTokenTransactions = async (httpService: IHttpService, tokenId: TokenIdentifier) =>
  await httpService.get<Transaction[]>(`tokens/${tokenId}/transactions`)

import { IHttpService } from '../../services/http'
import { Identity } from './types'

export const getIdentityRequest = async (http: IHttpService, id: string) => await http.get<Identity>(`identity/${id}`)

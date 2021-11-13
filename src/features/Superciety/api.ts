import { IHttpService } from '../../services/http'
import { ScyIdentity } from './types'

export const getScyIdentityRequest = async (http: IHttpService, id: string) => await http.get<ScyIdentity>(`identity/${id}`)

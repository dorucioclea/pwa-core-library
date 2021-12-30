import { IHttpService } from '../../services/http'
import { VmQueryResult } from './types'

export const storeVmQueryRequest = async (http: IHttpService, name: string, args?: Record<string, any>) =>
  await http.post<VmQueryResult>(`vm-query/${name}`, args)

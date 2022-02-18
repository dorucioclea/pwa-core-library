import { IHttpService } from '../../services/http'
import { VmResult } from './types'

export const storeVmQueryRequest = async (http: IHttpService, name: string, args?: Record<string, any>) =>
  await http.post<VmResult>(`vm-query/${name}`, args)

import { IHttpService } from '../../services/http'

export const storeVmQueryRequest = async <T>(http: IHttpService, name: string, args?: Record<string, any>) =>
  await http.post<T>(`vm-query/${name}`, args)

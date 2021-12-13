import { IHttpService } from '../../services/http'
import { PreparedTx } from './types'

export const getPreparedTxRequest = (http: IHttpService, name: string, args: Record<string, any>) => http.post<PreparedTx>(`prepare-tx/${name}`, args)

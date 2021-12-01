import fetch from 'isomorphic-unfetch'
import cookie from 'js-cookie'
import { showToast } from '../features/Feedback/Toast'

export interface IHttpService {
  readonly baseUrl: string
  onUnauthorized: (response: IAppResponse<any>) => void
  onSuccessfulResponse: (response: IAppResponse<any>) => void
  onMaintenanceMode: (response: IAppResponse<any>) => void
  get: <T>(url: string, options?: IRequestOptions) => Promise<IAppResponse<T>>
  post: <T>(url: string, data?: any, options?: IRequestOptions) => Promise<IAppResponse<T>>
  put: <T>(url: string, data?: any, options?: IRequestOptions) => Promise<IAppResponse<T>>
  delete: <T>(url: string, options?: IRequestOptions) => Promise<IAppResponse<T>>
}

export interface IAppResponse<T> {
  data: T
  meta?: any
  errors: any
  ok: boolean
  paymentRequired: boolean
  noContent: boolean
  original: Response
}

interface IRequestOptions {
  headers: { [name: string]: string }
}

export class HttpService implements IHttpService {
  baseUrl: string
  onUnauthorized: (response: IAppResponse<any>) => any
  onSuccessfulResponse: (response: IAppResponse<any>) => any
  onMaintenanceMode: (response: IAppResponse<any>) => any

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.onSuccessfulResponse = () => {}
    this.onUnauthorized = () => {}
    this.onMaintenanceMode = () => {}
  }

  public get = async <T>(url: string, options?: IRequestOptions) => await this.request<T>('GET', url, undefined, options)

  public post = async <T>(url: string, data?: any, options?: IRequestOptions) => await this.request<T>('POST', url, data, options)

  public put = async <T>(url: string, data?: any, options?: IRequestOptions) => await this.request<T>('PUT', url, data, options)

  public delete = async <T>(url: string, options?: IRequestOptions) => await this.request<T>('DELETE', url, undefined, options)

  private request = async <T>(httpMethod: string, url: string, data: any, options?: IRequestOptions) => {
    const requestUrl = url.startsWith('http') ? url : `${this.baseUrl}/${url}`
    const requestInfo = this.getRequestInfo(httpMethod, data, options)
    const response = await this.convertResponse<T>(fetch(requestUrl, requestInfo))

    if (response.original.status === 401) this.onUnauthorized(response)
    if (response.original.status === 503) this.onMaintenanceMode(response)
    if (response.ok) this.onSuccessfulResponse(response)

    return response
  }

  private convertResponse = async <T>(apiRes: Promise<Response>): Promise<IAppResponse<T>> => {
    try {
      const response = await apiRes
      const body = await response.json()

      return {
        data: body.data || body,
        meta: body.meta,
        errors: body.errors || [],
        ok: response.ok && !(body.errors && body.errors.length > 0),
        noContent: response.status === 204,
        paymentRequired: response.status === 402,
        original: response,
      }
    } catch (err: any) {
      return {
        data: {} as T,
        errors: err.response && (err.response.data || {}).errors,
        ok: false,
        noContent: false,
        paymentRequired: false,
        original: err,
      }
    }
  }

  private getRequestInfo = (httpMethod: string = 'GET', data?: any, options?: IRequestOptions) => ({
    method: httpMethod,
    credentials: 'include' as RequestCredentials,
    headers: {
      'X-XSRF-TOKEN': decodeURIComponent(cookie.get('XSRF-TOKEN') || ''),
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options?.headers || {}),
    },
    body: httpMethod !== 'GET' ? JSON.stringify(data || {}) : undefined,
  })
}

export const handleAppResponse = async <T>(
  appResponsePromise: Promise<IAppResponse<T>>,
  handleSuccess: (data: T, meta: any) => void,
  handleError?: ((paymentRequired: boolean, statusCode: number) => void) | null,
  timeoutInMilliseconds: number = 0
) => {
  const res = await appResponsePromise

  if (!res.ok) {
    showFirstResponseErrorToast(res)

    if (handleError) handleError(res.paymentRequired, res.original.status)

    return
  }

  setTimeout(() => handleSuccess(res.data, res.meta), timeoutInMilliseconds)
}

const showFirstResponseErrorToast = (res: IAppResponse<any>) => {
  if (!res.errors || res.errors.length < 1) return

  // what da fuk
  const firstError = Object.values(res.errors as string[][])[0]

  if (!firstError) return

  const firstErrorMessage = firstError[0]

  if (!firstErrorMessage) return

  showToast(firstErrorMessage, 'error')
}

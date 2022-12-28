import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Axios } from 'axios'

import type { RequestId } from './axios.d'

export default class Request extends Axios {
  private _requestMap: Map<RequestId, AbortController> = new Map()

  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public async request<T = AxiosResponse, D = any>(config: AxiosRequestConfig<D>): Promise<T> {
    config = { url: '', method: 'GET', ...config }

    const requestId = config.customOptions?.requestId

    if (requestId) {
      this.abort(requestId)
      const abortController = new AbortController()
      config.signal = abortController.signal
      this._requestMap.set(requestId, abortController)
    }

    try {
      return await super.request<any, T, D>(config)
    } finally {
      if (requestId) {
        this._requestMap.delete(requestId)
      }
    }
  }

  public get<T = AxiosResponse, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.request<T, D>({ ...config, url, method: 'GET' })
  }

  public delete<T = AxiosResponse, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return this.request<T, D>({ ...config, url, method: 'DELETE' })
  }

  public post<T = AxiosResponse, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return this.request<T, D>({ ...config, url, data, method: 'POST' })
  }

  public put<T = AxiosResponse, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return this.request<T, D>({ ...config, url, data, method: 'PUT' })
  }

  public patch<T = AxiosResponse, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return this.request<T, D>({ ...config, url, data, method: 'PATCH' })
  }

  public abort(requestId: RequestId) {
    const abortController = this._requestMap.get(requestId)
    if (abortController) {
      abortController.abort()
      this._requestMap.delete(requestId)
    }
  }

  public abortAll() {
    this._requestMap.forEach((abortController) => abortController.abort())
    this._requestMap.clear()
  }
}

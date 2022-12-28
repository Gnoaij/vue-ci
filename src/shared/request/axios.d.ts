import 'axios'

export type RequestId = number | string | symbol

export interface CustomOptions {
  requestId?: RequestId
}

declare module 'axios' {
  interface AxiosRequestConfig {
    customOptions?: CustomOptions
  }

  interface AxiosInterceptorManager<V> {
    use<T = V>(
      onFulfilled?: (value: T) => any,
      onRejected?: (error: any) => any,
      options?: AxiosInterceptorOptions
    ): number
  }
}

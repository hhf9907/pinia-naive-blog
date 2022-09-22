import { AxiosRequestConfig, AxiosResponse } from 'axios'

interface HFRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig // 请求拦截类型
  requestInterceptorCatch?: (err: any) => any // 请求拦截错误类型
  responseInterceptor?: (config: T) => T // 响应拦截类型
  responseInterceptorCatch?: (err: any) => any // 响应拦截错误类型
}

interface HFRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HFRequestInterceptors<T>
}

export { HFRequestInterceptors, HFRequestConfig }

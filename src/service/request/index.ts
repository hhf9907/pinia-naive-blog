import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { HFRequestInterceptors, HFRequestConfig } from './type'
import { useMessage } from 'naive-ui'
import localCache from '@/utils/cache'
import bus from '@/utils/bus'
const message = useMessage()
// import { ElNotification } from 'element-plus'

class HFRequest {
  instance: AxiosInstance
  interceptors?: HFRequestInterceptors<any>
  constructor(config: HFRequestConfig) {
    this.instance = axios.create(config)

    this.interceptors = config.interceptors

    // config取出的拦截器是实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res: any) => {
        if (res.code === 200) {
          return Promise.resolve(res.data)
        }
        if (res.code === 401) {
          window.$message.error(res.msg)
          localCache.deleteCache('token')
          bus.$emit('showLogin', true)
          return Promise.reject(res)
        }
        window.$message.error(res.msg || '服务器发生错误')
        return Promise.reject(res)
      },
      (err) => {
        console.log('服务器发生错误')
        window.$message.warning('服务器发生错误')
        return Promise.reject(err)
      }
    )
  }

  request<T>(config: HFRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对单个请求进行拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  put<T = any>(config: HFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
}

export default HFRequest

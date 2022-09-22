// service出口
import HFRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'
const hyRequest = new HFRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      if (localCache.getCache('token')) {
        if (config && config.headers) {
          config.headers.Authorization = localCache.getCache('token')
        }
      }
      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptor(response) {
      return response.data
    },
    responseInterceptorCatch(err) {
      return err
    }
  }
})
export default hyRequest

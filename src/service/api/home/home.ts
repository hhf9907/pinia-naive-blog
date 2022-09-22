import hyRequest from '../../index'
import { ISwiperType } from '@/service/api/home/type'
export function getSwiperImage() {
  return hyRequest.get<{
    list: ISwiperType[]
  }>({
    url: '/img_list'
  })
}

export function homeData() {
  return hyRequest.get<any>({
    url: '/home/multidata',
    interceptors: {
      requestInterceptor(config) {
        return config
      },
      responseInterceptor(res) {
        return res
      }
    }
  })
}

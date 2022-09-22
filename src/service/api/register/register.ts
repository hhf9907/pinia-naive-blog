import hfRequest from '../../index'
import { IRegType } from './type'

enum userApi {
  REGISTER = '/register',
  USER_INFO = '/user/info'
}

/**
 * 注册用户
 * @param data 
 * @returns 
 */
export function registerRequest(data: IRegType) {
  return hfRequest.post<any>({
    url: userApi.REGISTER,
    data
  })
}

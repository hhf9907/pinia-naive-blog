import hfRequest from '../../index'
import { ILogin, IEmailLogin, IEmailResetPassword } from './type'

enum userApi {
  LOGIN = '/login',
  USER_INFO = '/user/info',
  SEND_EMAIL_CODE = '/sendEmailCode',
  EMAIL_LOGIN = '/emailLogin',
  SEND_RESET_EMAIL_CODE = '/sendResetEmailCode',
  EMAIL_RESET_PASSWORD = '/resetPassword',
}

export function loginRequest(data: ILogin) {
  return hfRequest.post<any>({
    url: userApi.LOGIN,
    data
  })
}

export function getUserInfo() {
  return hfRequest.get<any>({
    url: userApi.USER_INFO
  })
}

export function sendEmailCode(email: string) {
  return hfRequest.post<{
    token: string
  }>({
    url: userApi.SEND_EMAIL_CODE,
    data: {
      email
    }
  })
}

export function handleEmailLogin(data: IEmailLogin) {
  return hfRequest.post<any>({
    url: userApi.EMAIL_LOGIN,
    data
  })
}

export function sendResetEmailCode(email: string) {
  return hfRequest.post<{
    token: string
  }>({
    url: userApi.SEND_RESET_EMAIL_CODE,
    data: {
      email
    }
  })
}

export function handleResetEmailPassword(data: IEmailResetPassword) {
  return hfRequest.post<any>({
    url: userApi.EMAIL_RESET_PASSWORD,
    data
  })
}

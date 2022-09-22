export interface ILogin {
  name: string
  passWord: string
}

export interface IEmailLogin {
  email: string
  code: string
  token: string
}

export interface IEmailResetPassword {
  email: string
  code: string
  token: string
  passWord: string
}

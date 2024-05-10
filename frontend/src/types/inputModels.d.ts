export interface ISigninInputModels {
  email: string
  password: string
}

export interface ISignupInputModels {
  name: string
  email: string
  type: import('./enum').TypeUser
  number?: string
  period?: string
}
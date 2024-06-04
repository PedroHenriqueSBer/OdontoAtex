
declare module 'inputModels' {
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
  export interface ISendCodeEmailInputModel {
    to: string,
    subject: string,
    description: string
  }
  export interface IResetPasswordInputModel {
    confirmNewPassword: string,
    newPassword: string,
    code: string
  }
}

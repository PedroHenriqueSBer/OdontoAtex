
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
  export interface ICreatePatientInputModel{
      name: string,
      profession: string,
      cpf: string,
      rg: string,
      father?: string,
      mother?: string,
      phone: string,
      regionalHealthCard: string,
      nationalHealthCard: string,
      dateOfBirth: string,
      placeOfBirth: string,
      state: string,
      address: string,
      number: string,
      neighborhood: string,
      city: string,
      zipCode: string
  }
}

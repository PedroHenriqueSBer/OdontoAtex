declare module 'viewModels' {
  export interface ILoginViewModel {
    token: string,
    user: import('models').IUser,
    refreshToken: string
  }
}




declare module 'models' {
  export interface IUser{
    id: string,
    name: string,
    email: string,
    type: import('./enum').TypeUser,
    disabled: boolean,
  }
}

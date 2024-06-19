
declare module 'models' {
  export interface IUser{
    id: string,
    name: string,
    email: string,
    type: import('./enum').TypeUser,
    disabled: boolean,
  }
  export interface ILog{
    id: string,
    title: string,
    message: string,
    type: import('./enum').TypeLog,
    createdBy: IUser,
    createdAt: Date
  }
}

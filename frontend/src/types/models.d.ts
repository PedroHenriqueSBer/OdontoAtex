
declare module 'models' {
  export interface IUser{
    id: string,
    name: string,
    email: string,
    type: import('./enum').TypeUser,
    disabled: boolean,
  }

  export interface IPatient{
      id: string,
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
      zipCode: string,
      createdAt: Date,
      createdBy: IUser, 
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

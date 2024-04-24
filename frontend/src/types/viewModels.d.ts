import { IUser } from "./models";

export interface ILoginViewModel {
  token: string,
  user: IUser,
  refreshToken: string
}

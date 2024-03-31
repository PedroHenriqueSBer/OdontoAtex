import { ISigninInputModels, ISignupInputModels } from "../types/inputModels";
import { ILoginViewModel } from "../types/viewModels";
import { api } from "./api";

const Login = (input: ISigninInputModels) => 
  new Promise<ILoginViewModel | string>((resolve,reject)=>
    api.post('Auth/login', input).then(({data: {error, message, data}})=> error? resolve(message) : resolve(data)).catch(reject))

const Signup = (input: ISignupInputModels) => 
  new Promise<ILoginViewModel | string>((resolve,reject)=>
    api.post('Auth/signup', input).then(({data: {error, message, data}})=> { error? resolve(message) : resolve(data)}).catch(reject))

const RefreshToken = (input: string) => 
  new Promise<ILoginViewModel>((resolve,reject)=>
    api.post('Auth/refresh-token', input).then(({data: {error, message, data}})=> error? resolve(message) : resolve(data)).catch(reject))

export const userController = {
  Login,
  Signup,
  RefreshToken
}
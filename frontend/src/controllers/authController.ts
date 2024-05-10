import { ISigninInputModels, ISignupInputModels } from "../types/inputModels";
import { ILoginViewModel } from "../types/viewModels";
import { api } from "../service/api";
import { resolveResponse } from "../utils";

const route = 'Auth'

const Signin = (input: ISigninInputModels) => 
  new Promise<ILoginViewModel>((resolve,reject)=>
    api.post(`${route}/login`, input).then(({data})=> resolveResponse<ILoginViewModel>(resolve,reject,data)).catch(reject))

const RefreshToken = (input: string) => 
  new Promise<ILoginViewModel>((resolve,reject)=>
    api.get(`${route}/refresh-token/${input}`).then(({data})=> resolveResponse<ILoginViewModel>(resolve,reject,data)).catch(reject))

export const authController = {
  Signin,
  RefreshToken
}

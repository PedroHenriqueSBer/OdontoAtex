import { ISigninInputModels } from "inputModels"
import { ILoginViewModel } from "viewModels"
import { api } from "../../service"
import { resolveResponse } from "../../utils"

const route = 'Auth'

const Signin = (input: ISigninInputModels) => 
  new Promise<ILoginViewModel>((resolve,reject)=>
    api.post(`${route}/login`, input).then(({data})=> resolveResponse<ILoginViewModel>(resolve,reject,data)).catch((error)=>{console.log(error);reject("Erro interno")}))

const RefreshToken = (input: string) => 
  new Promise<ILoginViewModel>((resolve,reject)=>
    api.get(`${route}/refresh-token/${input}`).then(({data})=> resolveResponse<ILoginViewModel>(resolve,reject,data)).catch((error)=>{console.log(error);reject("Erro interno")}))

export const authController = {
  Signin,
  RefreshToken
}

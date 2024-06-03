import { ISendCodeEmailInputModel } from "inputModels"
import { api } from "../../service/api"
import { resolveResponse } from "../../utils"

const route = 'SendEmail'

const code = (input: ISendCodeEmailInputModel) => 
  new Promise<string>((resolve,reject)=>
    api.post(`${route}/code`, input).then(({data})=> resolveResponse<string>(resolve,reject,data)).catch(()=>reject("Erro interno")))

export const emailController = {
  code,
}

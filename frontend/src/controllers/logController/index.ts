import { ILogInputModel } from "inputModels";
import { api } from "../../service"
import { resolveResponse } from "../../utils"
import { ILog } from "models";

const route = 'Log'

const getAll = () => 
  new Promise<ILog[]>((resolve,reject)=>
    api.get(`${route}`).then(({data})=> resolveResponse<ILog[]>(resolve,reject,data)).catch((error)=>{console.log(error);reject("Erro interno")}))

const insert = (input: ILogInputModel) => 
  new Promise<void>((resolve,reject)=>
    api.post(`${route}`,input).then(({data}) => resolve(data)).catch((error)=>{console.log(error);reject("Erro interno")}))

export const logController = {
  getAll,
  insert
}

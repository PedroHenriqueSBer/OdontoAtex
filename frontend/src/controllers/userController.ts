import { ISignupInputModels } from "../types/inputModels";
import { api } from "../service/api";
import { resolveResponse } from "../utils";
import { IUser } from "../types/models";

const route = 'User'

const Signup = (input: ISignupInputModels) => 
  new Promise<IUser>((resolve,reject)=>
    api.post(`${route}/signup`, input).then(({data})=> resolveResponse<IUser>(resolve,reject,data)).catch(()=>reject("Erro interno")))

const GetAll = () => 
  new Promise<IUser[]>((resolve,reject)=>
    api.get(`${route}/get-all`).then(({data})=> resolveResponse<IUser[]>(resolve,reject,data)).catch(()=>reject("Erro interno")))

const Disabled = (id: string) => 
  new Promise<boolean>((resolve,reject)=>
    api.put(`${route}/delete/${id}`).then(({data})=> resolveResponse<boolean>(resolve,reject,data)).catch(()=>reject("Erro interno")))

export const userController = {
  Signup,
  GetAll,
  Disabled
}

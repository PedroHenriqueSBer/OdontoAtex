import { ISignupInputModels } from "../types/inputModels";
import { api } from "../service/api";
import { resolveResponse } from "../utils";
import { IUser } from "../types/models";

const route = 'User'

const Signup = (input: ISignupInputModels) => 
  new Promise<IUser>((resolve,reject)=>
    api.post(`${route}/signup`, input).then(({data})=> resolveResponse<IUser>(resolve,reject,data)).catch(reject))

export const userController = {
  Signup
}

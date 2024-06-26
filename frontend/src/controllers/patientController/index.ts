import { ICreatePatientInputModel} from "inputModels"
import { api } from "../../service/api"
import { resolveResponse } from "../../utils"
import { IPatient } from "models"

const route = 'Patient'

const create = (input: ICreatePatientInputModel) => 
  new Promise<IPatient>((resolve,reject)=>
    api.post(`${route}`, input).then(({data})=> resolveResponse<IPatient>(resolve,reject,data)).catch(()=>reject("Erro interno")))

const GetAll = () =>
  new Promise<IPatient[]>((resolve,reject)=>
    api.get(`${route}/get-all`).then(({data})=> resolveResponse<IPatient[]>(resolve,reject,data)).catch(()=>reject("Erro ao tentar recurperar os dados dos pacientes")))

export const patientController = {
  create,
  GetAll
}

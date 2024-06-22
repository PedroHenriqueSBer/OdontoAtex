import axios from "axios";
import { IAddress } from "models";

export const consultCep = (cep: string) => 
  new Promise<IAddress>((resolve, reject) =>
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(({data}) => resolve({
        cep,
        city: data.localidade,
        neighborhood: data.bairro,
        number: '0',
        state: '',
        street: data.logradouro,
        uf: data.uf,
        complement: data.complemento
      }))
      .catch(reject)
  )
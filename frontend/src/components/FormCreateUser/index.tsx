import { Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import { TypeUser } from "../../types/enum"
import { useForm, Controller } from "react-hook-form"
import * as yup from 'yup'
import { useState } from "react"
import { ISignupInputModels } from "../../types/inputModels"
import { yupResolver } from "@hookform/resolvers/yup"
import { Popup } from "../popup"
import { useUser } from "../../context/useUsers"
import { userController } from "../../controllers/userController"
import { useLoading } from "../../context/useLoading"

export const FormCreateUser = () => {

  const [apiMessage, setApiMessage] = useState<string>('')

  const schema = yup.object<ISignupInputModels>().shape({
    email: yup.string().email('Precisa ser um email válido').required('Campo nescessário'),
    name: yup.string().required('Campo nescessário'),
    type: yup.number().required('Campo nescessário'),
    number: yup.string(),
    period: yup.string()
  })

  const [defaultValues] = useState<ISignupInputModels>({
    email: '',
    name: '',
    type: TypeUser.STUDENT,
    number: '',
    period: '1'
  })

  const {
    setUsers,
    users
  } = useUser()

  const {
    setIsLoading
  } = useLoading()
 
  const {
    control,
    formState: {errors},
    watch,
    handleSubmit,
    setError,
    reset
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit = (input: ISignupInputModels) => {
    setIsLoading(true)
    if(input.type === TypeUser.STUDENT){
      if(input.number === undefined){
        setError('number',{message: 'Campo nescessário'})
        return
      }
      if(input.number?.length !== 9){
        setError('number',{message: 'Número inválido'})
        return
      }
      const inputFinal:ISignupInputModels = {
        email: input.email,
        name: input.name,
        type: input.type,
        number: input.number,
        period: input.period
      }
      userController.Signup(inputFinal)
        .then(response => {
          reset(defaultValues)
          users.push(response)
        })
        .catch(setApiMessage)
        .finally(()=>{
          setIsLoading(false)
        })
    }
    else{
      userController.Signup(input)
        .then(response => {
          reset(defaultValues)
          users.push(response)
        })
        .catch(setApiMessage)
        .finally(()=>{
          setIsLoading(false)
        })
    }
  }

  const {
    type,
  } = watch()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component='p' variant="h5" color='primary'>Criar Usuários</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={type === TypeUser.STUDENT? 6 : 3} lg={type === TypeUser.STUDENT? 5 : 4}>
          <Controller 
            name="name"
            control={control}
            render={({field}) =>
              <TextField 
                error={!!errors.name?.message}
                helperText={errors.name?.message}
                label="Nome"
                fullWidth
                size="small"
                {...field}
              />
            }
          />
        
        </Grid>
        <Grid item xs={12} sm={6} md={type === TypeUser.STUDENT? 6 : 3} lg={type === TypeUser.STUDENT? 5 : 4}>
          <Controller 
            name="email"
            control={control}
            render={({field}) =>
              <TextField 
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                label="Email"
                size="small"
                {...field}
                fullWidth
              />
            }
          />
        </Grid>
        <Grid item xs={12} md={type === TypeUser.STUDENT? 3 : 4} lg={2}>
          <Controller 
            name="type"
            control={control}
            render={({field}) =>
              <Select
                size="small"
                error={!!errors.type?.message}
                fullWidth
                {...field}
              >
                <MenuItem value={TypeUser.STUDENT}>Estudante</MenuItem>
                <MenuItem value={TypeUser.TEACHER}>Professor</MenuItem>
                <MenuItem value={TypeUser.SECRETARY}>Secretaria</MenuItem>
              </Select>
            }
          />

        </Grid>
        {type === TypeUser.STUDENT &&
        <>
          <Grid item xs={12} sm={6} md={4} lg={5}>
            <Controller 
              name="number"
              control={control}
              render={({field}) =>
                <TextField 
                  label="Número de inscrição"
                  error={!!errors.number?.message}
                  helperText={errors.number?.message}
                  size="small"
                  {...field}
                  fullWidth
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={5}>
            <Controller 
              name="period"
              control={control}
              render={({field}) =>
                <Select
                  size="small"
                  error={!!errors.period?.message}
                  fullWidth
                  {...field}
                >
                  <MenuItem value={'1'}>1° Periodo</MenuItem>
                  <MenuItem value={'2'}>2° Periodo</MenuItem>
                  <MenuItem value={'3'}>3° Periodo</MenuItem>
                  <MenuItem value={'4'}>4° Periodo</MenuItem>
                  <MenuItem value={'5'}>5° Periodo</MenuItem>
                  <MenuItem value={'6'}>6° Periodo</MenuItem>
                  <MenuItem value={'7'}>7° Periodo</MenuItem>
                  <MenuItem value={'8'}>8° Periodo</MenuItem>
                  <MenuItem value={'9'}>9° Periodo</MenuItem>
                  <MenuItem value={'10'}>10° Periodo</MenuItem>
                </Select>
              }
            />
            
          </Grid>
        </>

        }

        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
          >
            Criar
          </Button>
        </Grid>
      </Grid>
      <Popup 
        title="Erro"
        description={apiMessage}
        isOpen={apiMessage !== ''}
        onClose={()=>setApiMessage('')}
        onConfirm={()=>setApiMessage('')}
        onDenied={()=>setApiMessage('')}
        isNotDenied
      />
    </form>

  )
}
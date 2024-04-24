import { Containter, Content } from "./style"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { useEffect, useState } from "react"
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { ISignupInputModels } from "../../types/inputModels"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import { AlertCircle } from "lucide-react"
import { authController } from "../../controllers/authController"
import { useLoading } from "../../context/useLoading"

export const Signup = () => {

  const [isOpenDialog,setIsOpenDialog] = useState(false)
  const [messageApi,setMessageApi] = useState<string>("")

  const { 
    isTokenValid,
    setRefreshToken,
    setToken,
    setUser
  } = useAuth()

  const { setIsLoading } = useLoading()

  const schema = yup.object<ISignupInputModels>().shape({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    name: yup.string().min(6, "mínimo 6 caracteres").required("Nome é obrigatório"),
    password: yup.string().min(6, "mínimo 6 caracteres").required("Senha é obrigatório")
  })

  const [defaultValues] = useState<ISignupInputModels>({
    email: "",
    name: "",
    password: ""
  })

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  useEffect(()=>{
    if(isTokenValid)
      navigate('/Home')
  },[isTokenValid, navigate])

  useEffect(()=>{
    if(messageApi !== '')
      setIsOpenDialog(true)
  },[messageApi])

  const handleSignup = (input: ISignupInputModels) => {
    setIsLoading(true)
    authController.Signup(input)
      .then(response => {
        setRefreshToken(response.refreshToken)
        setToken(response.token)
        setUser(response.user)
      })
      .catch(setMessageApi)
      .finally(()=>setIsLoading(false))
  }



  return (
    <Containter>
      <Content onSubmit={handleSubmit(handleSignup)}>
        <h2>Signup</h2>
        <Controller 
          name="email"
          control={control}
          render={({field})=>
            <TextField 
              size="small" 
              placeholder="Email"
              error={!!errors.email?.message}
              helperText={errors.email?.message} 
              {...field}
            />
          }
        />

        <Controller 
          name="name"
          control={control}
          render={({field})=>
            <TextField 
              size="small" 
              placeholder="Nome"
              error={!!errors.name?.message}
              helperText={errors.name?.message} 
              {...field}
            />
          }
        />

        <Controller 
          name="password"
          control={control}
          render={({field})=>
            <TextField 
              size="small" 
              placeholder="Senha"
              type="password"
              error={!!errors.password?.message}
              helperText={errors.password?.message} 
              {...field}
            />
          }
        />


        <Button type="submit">Criar Conta</Button>
        <Link to='/'>Já tenho conta!</Link>
      </Content>
      <Dialog
        open={isOpenDialog}
        onClose={()=>setIsOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <AlertCircle/> Erro ao Logar
        </DialogTitle>
        <DialogContent>
          {messageApi}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setIsOpenDialog(false)}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </Containter>
  )
}
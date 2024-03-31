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
import { ISigninInputModels } from "../../types/inputModels"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import { AlertCircle } from "lucide-react"

export const Signin = () => {

  const [isOpenDialog,setIsOpenDialog] = useState(false)
  const [messageApi,setMessageApi] = useState<string>("")

  const { signin, isTokenValid } = useAuth()

  const schema = yup.object<ISigninInputModels>().shape({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup.string().min(6, "mínimo 6 caracteres").required("Nome é obrigatório")
  })

  const [defaultValues] = useState<ISigninInputModels>({
    email: "",
    password: ""
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const navigate = useNavigate()

  useEffect(()=>{
    if(isTokenValid)
      navigate('/Home')
  },[isTokenValid, navigate])

  const handleSignin = (input: ISigninInputModels) => {
    signin(input).then((message: string)=>{
      console.log(message)
      if(message !== ""){
        setMessageApi(message)
        setIsOpenDialog(true)
      }
    })
  }

  return (
    <Containter>
      <Content onSubmit={handleSubmit(handleSignin)}>
        <h2>Login</h2>
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


        <Button type="submit">Entrar</Button>
        <Link to='/Signup'>criar conta</Link>
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
import { Button, Grid, Modal, TextField, Typography } from "@mui/material"
import { IModalProps, ISendEmailProps } from "props"
import { Container } from "./style"
import { useAuth, useLoading } from "../../context"
import { useState } from "react"
import { IResetPasswordInputModel, ISendCodeEmailInputModel } from "inputModels"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { emailController, userController } from "../../controllers"
import { Popup } from "../popup"

const SendEmail = ({setCode, code, setEmail}: ISendEmailProps) => {
  const { user, isTokenValid } = useAuth()
  const { setIsLoading } = useLoading()

  const [defaultValues] = useState<ISendCodeEmailInputModel>({
    description: 'Use o código abaixo para trocar a sua senha no sistema',
    subject: 'Redefinir senha',
    to: user.email ?? ''
  })

  const schema = yup.object<ISendCodeEmailInputModel>().shape({
    description: yup.string().required(),
    subject: yup.string().required(),
    to: yup.string().email('entre com um email válido').required('campo obrigatório')
  })

  const { 
    control,
    formState: {errors},
    handleSubmit,
    setError
   } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit = (input: ISendCodeEmailInputModel) => {
    setIsLoading(true)
    emailController.code(input).then((response) => {
      setCode(response)
      setEmail(input.to)
    }).catch((response) => {
      setError('to',{message: response})
    }).finally(() => {
      setIsLoading(false)
    })
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" color="primary">Enviar código</Typography>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="to"
            control={control} 
            render={({field}) => 
              <TextField 
                label='Email'
                fullWidth
                disabled={isTokenValid || !!code}
                error={!!errors.to?.message}
                helperText={errors.to?.message}
                {...field}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" disabled={!!code} style={{alignSelf: 'center'}} id="sendCodeBtn">Enviar Código</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export const RecoverPassword = ({
  isOpen,
  onClose
}: IModalProps) => {

  const { user, isTokenValid } = useAuth()

  const [code,setCode] = useState<string | null>(null)
  const [email,setEmail] = useState<string>('')
  const [title,setTitle] = useState<string>('')
  const [description,setDescription] = useState<string>('')
  const { setIsLoading } = useLoading()

  const [defaultValues] = useState<IResetPasswordInputModel>({
    code: '',
    password: '',
    confirmPassword: ''
  })

  const schema = yup.object<IResetPasswordInputModel>().shape({
    code: yup.string().required('campo necessário'),
    password: yup.string().required('campo necessário').min(3,'precisa de 3 caracteres no mínimo'),
    confirmPassword: yup.string().required('campo necessário')
  })

  const { 
    control,
    formState: {errors},
    handleSubmit,
    setError
   } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit = (input: IResetPasswordInputModel) => {
    if(input.code !== code){
      setError('code',{message: 'Código inválido'})
      return
    }
    if(input.confirmPassword !== input.password){
      setError('confirmPassword',{message: 'As senhas não conhecidem'})
      return
    }
    setIsLoading(true)
    userController.ResetPassword(input.password, email)
      .then((b) => {
        if(b){
          setTitle('Sucesso')
          setDescription('Senha alterada com sucesso')
          onClose()
        }
        else{
          setTitle('Erro')
          setDescription('Não foi possível mudar sua senha')
        }
      })
      .catch(() => {
        setTitle('Erro')
        setDescription('Não foi possível mudar sua senha')
      })
      .finally(() => setIsLoading(false))

  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
          <Container id="resetPassword">
            <SendEmail code={code} setCode={setCode} setEmail={setEmail}/>
            {!!code &&
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" color="primary">Recuperar senha</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="code"
                      control={control} 
                      render={({field: {value, ...field}}) => 
                        <TextField 
                          label='Código'
                          fullWidth
                          error={!!errors.code?.message}
                          helperText={errors.code?.message}
                          value={value.substring(0,4)}
                          {...field}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="password"
                      control={control} 
                      render={({field}) => 
                        <TextField 
                          label='Senha'
                          fullWidth
                          error={!!errors.password?.message}
                          helperText={errors.password?.message}
                          {...field}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="confirmPassword"
                      control={control} 
                      render={({field}) => 
                        <TextField 
                          label='Confirmar senha'
                          fullWidth
                          error={!!errors.confirmPassword?.message}
                          helperText={errors.confirmPassword?.message}
                          {...field}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" style={{alignSelf: 'center'}} id="savePassword">Alterar Senha</Button>
                  </Grid>
                </Grid>
              </form>
            }
          </Container>
      </Modal>
      <Popup 
        title={title}
        description={description}
        isOpen={!(title === '')}
        error={title === 'Erro'}
        onClose={() => setTitle('')}
        onConfirm={() => setTitle('')}
        onDenied={() => setTitle('')}
        isNotDenied
      />
    </>
  )
}
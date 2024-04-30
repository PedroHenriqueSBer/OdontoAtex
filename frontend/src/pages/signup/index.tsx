import { useEffect, useState } from "react"
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { ISignupInputModels } from "../../types/inputModels"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import { authController } from "../../controllers/authController"
import { useLoading } from "../../context/useLoading"
import { Button, Container, Content, Fieldset, Helpertext, Main, Sidebar } from './style';
import { Eye, EyeOff, Info, Lock, Mail, User } from 'lucide-react';
import { Popup } from '../../components/popup';

export const Signup = () => {

  const [isOpenDialog,setIsOpenDialog] = useState(false)
  const [messageApi,setMessageApi] = useState<string>("")
  const [showPassowrd, setShowPassowrd] = useState<boolean>(false);

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
    <Container>
      <Content>
        <Sidebar>
          <h1>BEM - VINDO</h1>
          <h2><span>INSC</span>REVA-SE</h2>
          <Button onClick={() => navigate('/')}>Fazer Login</Button>
        </Sidebar>
        <Main onSubmit={handleSubmit(handleSignup)}>
          <h1>CADASTRAR-SE</h1>
          <div className="content">
            <Controller 
              control={control}
              name="name"
              render={({field})=>
                <>
                  <Fieldset error={!!errors.name?.message}>
                    <div>
                      <User width={18} height={18} />
                    </div>
                    <input placeholder="Nome" {...field} type="text" />
                  </Fieldset>
                  {!!errors.name?.message &&
                    <Helpertext>{errors.name?.message}</Helpertext>
                  }
                </>

              }
            />
          </div>
          <div className="content">
            <Controller 
              control={control}
              name="email"
              render={({field})=>
                <>
                  <Fieldset error={!!errors.email?.message}>
                    <div>
                      <Mail width={18} height={18} />
                    </div>
                    <input placeholder="Email" {...field} type="text" />
                  </Fieldset>
                  {!!errors.email?.message &&
                    <Helpertext>{errors.email?.message}</Helpertext>
                  }
                </>

              }
            />
          </div>
          <div className="content">
            <Controller 
              control={control}
              name="password"
              render={({field})=>
                <>
                  <Fieldset error={!!errors.password?.message}>
                    <div>
                      <Lock width={18} height={18} />
                    </div>
                    <input placeholder="Senha" {...field} type={showPassowrd? 'text' : 'password'} />
                    <button type="button" onClick={()=>setShowPassowrd(!showPassowrd)}>
                      {showPassowrd ? <Eye width={18} height={18}/> : <EyeOff width={18} height={18}/>}
                    </button>
                  </Fieldset>
                  {!!errors.password?.message &&
                    <Helpertext>{errors.password?.message}</Helpertext>
                  }
                </>

              }
            />
          </div>
          <div className="btnContent">
            <Button type="submit" primary>Cadastrar</Button>
            <Button type="button" className="mobile" onClick={() => navigate('/')}>Entrar</Button>
          </div>
        </Main>
      </Content>
      <Popup 
        isOpen={isOpenDialog}
        onClose={()=>{setIsOpenDialog(!isOpenDialog); setMessageApi('')}}
        onConfirm={()=>{setIsOpenDialog(!isOpenDialog); setMessageApi('')}}
        onDenied={()=>{setIsOpenDialog(!isOpenDialog); setMessageApi('')}}
        title='Erro'
        icon={Info}
        description={messageApi}
        error
        isNotDenied
      />
    </Container>
  )
}
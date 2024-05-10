import { useEffect, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ISigninInputModels } from "../../types/inputModels";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useLoading } from "../../context/useLoading";
import { authController } from "../../controllers/authController";
import { Button, ButtonLink, Container, Content, Fieldset, Helpertext, Main, Sidebar } from "./style";
import { Eye, EyeOff, Info, Lock, Mail } from "lucide-react";
import { Popup } from "../../components/popup";

export const Signin = () => {

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [messageApi, setMessageApi] = useState<string>("");
  const [showPassowrd, setShowPassowrd] = useState<boolean>(false);
  const { setIsLoading } = useLoading();

  const {
    isTokenValid, setRefreshToken, setToken, setUser
  } = useAuth();

  const schema = yup.object<ISigninInputModels>().shape({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup.string().min(6, "mínimo 6 caracteres").required("Senha é obrigatório")
  });

  const [defaultValues] = useState<ISigninInputModels>({
    email: "",
    password: ""
  });

  const {
    control, 
    handleSubmit, 
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenValid)
      navigate('/');
  }, [isTokenValid, navigate]);

  useEffect(() => {
    if (messageApi !== '')
      setIsOpenDialog(true);
  }, [messageApi]);

  const handleSignin = (input: ISigninInputModels) => {
    setIsLoading(true);
    authController.Signin(input)
      .then(response => {
        setRefreshToken(response.refreshToken);
        setToken(response.token);
        setUser(response.user);
      })
      .catch(setMessageApi)
      .finally(() => setIsLoading(false));
  };

  return (
    <Container>
      <Content>
        <Sidebar>
          <h1>BEM - VINDO</h1>
          <h2><span>NOVO</span> LOGIN</h2>
        </Sidebar>
        <Main onSubmit={handleSubmit(handleSignin)}>
          <h1>FAÇA LOGIN</h1>
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
                    <input {...field} type="text" placeholder="Email" />
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
                    <input {...field} placeholder="Senha" type={showPassowrd? 'text' : 'password'} />
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
            
            <ButtonLink type="button">Redefinir Senha?</ButtonLink>
          </div>
          <Button type="submit" primary>Entrar</Button>
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
  );
};

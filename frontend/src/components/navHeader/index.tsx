import { Header } from "./style"
import { Bell, UserRound, Calendar, User, LogOut, UsersRound, EllipsisVertical, NotepadText } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { TypeUser } from "../../types/enum";
import { useTheme } from "styled-components";
import { useAuth } from "../../context";
import { IDropDownOptions } from "props";
import { DropDown } from "../dropDown";


interface NavHeaderProps{
  position?: 'fixed' | 'absolute'
}

export const NavHeader = ({
  position
}: NavHeaderProps) => {

  const navigate = useNavigate()

  const theme = useTheme()

  const { logout, user, isTokenValid } = useAuth()

  const options: IDropDownOptions[] = [
    {
      classname: 'patient',
      onClick: () => navigate('/patients'),
      icon: UserRound,
      name: 'Pacientes',
      enable: true,
      variant: 'default'
    },
    {
      classname: 'calendar',
      onClick: () => navigate('/'),
      icon: Calendar,
      name: 'Agenda',
      enable: true,
      variant: 'default'
    },
    {
      classname: 'screening',
      onClick: () => navigate('/'),
      icon: NotepadText,
      name: 'triagem',
      enable: [TypeUser.STUDENT, TypeUser.TEACHER].includes(user.type),
      variant: 'default'
    },
    {
      classname: 'user',
      onClick: () => navigate('/users'),
      icon: UsersRound,
      name: 'Usuários',
      enable: [TypeUser.ADM].includes(user.type),
      variant: 'default'
    }
  ]

  return (
    <>
      <Header position={position}>
        <div className="desktop">
          <button id="navigateHome" onClick={() => navigate('/')}>
            <img className="logo" src="/assets/unifenas.png" alt="Logo da Unifenas" />
          </button>
          {isTokenValid &&
            options.filter(o => o.enable).map(({icon: Icon,name,onClick,classname}, index) => 
              <Button key={index} id={classname} className={classname} style={{gap: '0.4rem'}} onClick={onClick}>
                <Icon width={19} height={19} />
                {name}
              </Button>
            )
          }
        </div>
        <div className="mobile">
          <button onClick={() => navigate('/')}>
            <img className="logo" src="/assets/icon.png" alt="Logo da BiteByte" />
          </button>
        </div>
        {isTokenValid ?
          (
            <>
              <div>
                <IconButton color="primary">
                  <Bell width={19} height={19} />
                </IconButton>
                <div className="desktop">
                  <DropDown options={[
                    {
                      enable: true,
                      icon: User,
                      name: 'Perfill',
                      onClick: () => navigate('/'),
                      variant: 'default'
                    },
                    {
                      enable: true,
                      icon: LogOut,
                      name: 'Sair',
                      onClick: logout,
                      variant: 'warning'
                    }
                  ]} marginX="-2.5rem" marginY="8rem">
                    <img src="/assets/userImage.png" alt="" />
                  </DropDown>
                </div>
                <div className="mobile patient calendar user">
                  <DropDown options={[
                    ...options,
                    {
                      enable: true,
                      icon: User,
                      name: 'Perfill',
                      onClick: () => navigate('/'),
                      variant: 'default'
                    },
                    {
                      enable: true,
                      icon: LogOut,
                      name: 'Sair',
                      onClick: logout,
                      variant: 'warning'
                    }
                  ]} marginX="-4.9rem" marginY="13.5rem">
                    <EllipsisVertical width={19} height={19} style={{color: theme.colors.primary}}/>
                  </DropDown>
                </div>
              </div>
            </>
          )
          :
          (
            <div>
              <Button className="first-step" onClick={() => navigate('/signin')} id="joinBtn">
                entrar
              </Button>
            </div>
          )
        }

      </Header>
    </>

  )
}
import { ButtonHeader, Header, MenuItemContent, MenuItemButton } from "./style"
import { Bell, UserRound, Calendar, User, LogOut, UsersRound, EllipsisVertical } from 'lucide-react'
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { TypeUser } from "../../types/enum";
import { useTheme } from "styled-components";


interface NavHeaderProps{
  position?: 'fixed' | 'absolute'
}

export const NavHeader = ({
  position
}: NavHeaderProps) => {

  const navigate = useNavigate()

  const theme = useTheme()

  const { logout, user, isTokenValid } = useAuth()

  const options = [
    {
      classname: 'patient',
      route: '/',
      icon: UserRound,
      name: 'Pacientes',
      enable: true
    },
    {
      classname: 'calendar',
      route: '/',
      icon: Calendar,
      name: 'Agenda',
      enable: true
    },
    {
      classname: 'user',
      route: '/users',
      icon: UsersRound,
      name: 'Usuários',
      enable: user.type === TypeUser.ADM
    }
  ]

  return (
    <>
      <Header position={position}>
        <div className="desktop">
          <button onClick={() => navigate('/')}>
            <img className="logo" src="https://github.com/PedroHenriqueSBer/OdontoAtex/blob/TypeUser/frontend/src/assets/unifenas.png?raw=true" alt="Logo da Unifenas" />
          </button>
          {isTokenValid &&
            options.filter(o => o.enable).map(({icon: Icon,name,route,classname}) => 
              <Button className={classname} style={{gap: '0.4rem'}} onClick={()=>navigate(route)}>
                <Icon width={19} height={19} />
                {name}
              </Button>
            )
          }
        </div>
        <div className="mobile">
          <button onClick={() => navigate('/')}>
            <img className="logo" src="https://github.com/PedroHenriqueSBer/OdontoAtex/blob/TypeUser/frontend/src/assets/icon.png?raw=true" alt="Logo da BiteByte" />
          </button>
        </div>
        {isTokenValid ?
          (
            <>
              <div>
                <IconButton color="primary">
                  <Bell width={19} height={19} />
                </IconButton>
                <Dropdown>
                  <MenuButton><img src="https://github.com/PedroHenriqueSBer/OdontoAtex/blob/TypeUser/frontend/src/assets/userImage.png?raw=true" alt="" /></MenuButton>
                  <Menu>
                    <MenuItemContent>
                      <MenuItemButton className="first" variant="default"><User width={16} height={16} />Perfill</MenuItemButton>
                      <MenuItemButton className="last" onClick={()=>{logout();navigate('/signin')}} variant="warning"><LogOut width={16} height={16}/>Sair</MenuItemButton>
                    </MenuItemContent>
                  </Menu>
                </Dropdown>
                <div className="mobile patient calendar user">
                  <Dropdown>
                    <MenuButton><EllipsisVertical width={19} height={19} style={{color: theme.colors.primary}}/></MenuButton>
                    <Menu>
                      <MenuItemContent>
                        {options.filter(o => o.enable).map(({icon: Icon,name,route}, index, self) => 
                          <MenuItemButton className={index === 0 ? 'first' : (self.length-1) === index ? 'last' : ''} variant="default" onClick={()=>navigate(route)}><Icon width={16} height={16} />{name}</MenuItemButton>
                        )}
                      </MenuItemContent>
                    </Menu>
                  </Dropdown>
                </div>
              </div>
            </>
          )
          :
          (
            <div>
              <Button className="first-step" onClick={() => navigate('/signin')}>
                entrar
              </Button>
            </div>
          )
        }

      </Header>
    </>

  )
}
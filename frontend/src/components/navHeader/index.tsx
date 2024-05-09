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
var Unifenas = require('./../../assets/unifenas.png')
var Icon = require('./../../assets/icon.png')
var UserImg = require('./../../assets/userImage.png')

export const NavHeader = () => {

  const navigate = useNavigate()

  const theme = useTheme()

  const { logout, user } = useAuth()

  const options = [
    {
      route: '/home',
      icon: UserRound,
      name: 'Pacientes',
      enable: true
    },
    {
      route: '/home',
      icon: Calendar,
      name: 'Agenda',
      enable: true
    },
    {
      route: '/users',
      icon: UsersRound,
      name: 'Usuários',
      enable: user.type === TypeUser.ADM
    }
  ]

  return (
    <>
      <Header>
        <div className="desktop">
          <button onClick={() => navigate('/home')}>
            <img className="logo" src={Unifenas} alt="Logo da Unifenas" />
          </button>
          {options.filter(o => o.enable).map(({icon: Icon,name,route}) => 
            <Button style={{gap: '0.4rem'}} onClick={()=>navigate(route)}>
              <Icon width={19} height={19} />
              {name}
            </Button>
          )}
        </div>
        <div className="mobile">
          <button onClick={() => navigate('/home')}>
            <img className="logo" src={Icon} alt="Logo da BiteByte" />
          </button>
        </div>
        <div>
          <IconButton color="primary">
            <Bell width={19} height={19} />
          </IconButton>
          <Dropdown>
            <MenuButton><img src={UserImg} alt="" /></MenuButton>
            <Menu>
              <MenuItemContent>
                <MenuItemButton className="first" variant="default"><User width={16} height={16} />Perfill</MenuItemButton>
                <MenuItemButton className="last" onClick={()=>{logout()}} variant="warning"><LogOut width={16} height={16}/>Sair</MenuItemButton>
              </MenuItemContent>
            </Menu>
          </Dropdown>
          <div className="mobile">
            <Dropdown>
              <MenuButton><EllipsisVertical width={19} height={19} style={{color: theme.colors.primary}}/></MenuButton>
              <Menu>
                <MenuItemContent>
                  {options.filter(o => o.enable).map(({icon: Icon,name,route}, index, self) => 
                    <MenuItemButton className={index === 0 ? 'first' : (self.length-1) === index ? 'last' : '' } variant="default" onClick={()=>navigate(route)}><Icon width={16} height={16} />{name}</MenuItemButton>
                  )}
                </MenuItemContent>
              </Menu>
            </Dropdown>
          </div>

        </div>
      </Header>
    </>

  )
}
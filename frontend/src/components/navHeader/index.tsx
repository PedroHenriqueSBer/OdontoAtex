import { IconButton } from "../iconButton"
import { ButtonHeader, Header, MenuItemContent, MenuItemButton } from "./style"
import { Bell, UserRound, Calendar, User, LogOut } from 'lucide-react'
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
var Unifenas = require('./../../assets/unifenas.png')
var UserImg = require('./../../assets/userImage.png')

export const NavHeader = () => {

  const navigate = useNavigate()

  const { logout } = useAuth()

  return (
    <>
      <Header>
        <div>
          <button onClick={() => navigate('/Home')}>
            <img className="logo" src={Unifenas} alt="Logo da Unifenas" />
          </button>
          <ButtonHeader>
            <UserRound width={19} height={19} />
            Pacientes
          </ButtonHeader>
          <ButtonHeader >
            <Calendar width={19} height={19} />
            Agenda
          </ButtonHeader>
        </div>
        <div>
          <IconButton IconProps={{ size: 16 }} Icon={Bell} />
          <Dropdown>
            <MenuButton><img src={UserImg} alt="" /></MenuButton>
            <Menu>
              <MenuItemContent>
                <MenuItemButton className="first" variant="default"><User width={16} height={16} />Perfill</MenuItemButton>
                <MenuItemButton className="last" onClick={()=>{logout()}} variant="warning"><LogOut width={16} height={16}/>Sair</MenuItemButton>
              </MenuItemContent>
            </Menu>
          </Dropdown>
        </div>
      </Header>
    </>

  )
}
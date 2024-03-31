import { IconButton } from "../iconButton"
import { ButtonHeader, Header, MenuItemContent, MenuItemButton } from "./style"
import { Bell, UserRound, Calendar, User, LogOut } from 'lucide-react'
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { useAuth } from "../../context/useAuth";
var Unifenas = require('./../../assets/unifenas.png')
var UserImg = require('./../../assets/userImage.png')

export const NavHeader = () => {

  const { logout } = useAuth()

  return (
    <>
      <Header>
        <div>
          <button>
            <img className="logo" src={Unifenas} alt="Logo da Unifenas" />
          </button>
          <ButtonHeader>
            <UserRound width={18} height={18} />
            Pacientes
          </ButtonHeader>
          <ButtonHeader >
            <Calendar width={18} height={18} />
            Agenda
          </ButtonHeader>
        </div>
        <div>
          <IconButton IconProps={{ size: 18 }} Icon={Bell} />
          <Dropdown>
            <MenuButton><img src={UserImg} alt="" /></MenuButton>
            <Menu>
              <MenuItemContent>
                <MenuItemButton className="first"><User width={16} height={16}/>Perfill</MenuItemButton>
                <MenuItemButton className="last" warning onClick={()=>{logout()}}><LogOut width={16} height={16}/>Sair</MenuItemButton>
              </MenuItemContent>
            </Menu>
          </Dropdown>
        </div>
      </Header>
    </>

  )
}
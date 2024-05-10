import { Typography } from "@mui/material"
import { NavHeader } from "../../components/navHeader"
import { Containter, HomeContent, HomeFooter, HomeImage } from "./style"
import { Mail, Phone } from "lucide-react"
import { useTour } from "@reactour/tour"

export const Home = () => {

  const { setIsOpen } = useTour()

  return (
    <>
      <NavHeader position="fixed"/>
      <Containter>
        <HomeImage>
          <div>
            <Typography component='p' variant="h3" color='primary'>Bem Vindo ao Bite&Byte</Typography>
          </div>
        </HomeImage>
        <HomeContent>
          <img src="https://github.com/PedroHenriqueSBer/OdontoAtex/blob/HomePage/frontend/src/assets/icon.png?raw=true" alt="" />
          <Typography component='p' variant="h4" color='primary'>É Bem Simples!</Typography>
          <span>
            Uma soluçao fácil e intuitiva de gerenciamento de <br /> triagens, agendamentos, criação e edição dos clientes <br /> da unifenas!
          </span>
          <button onClick={()=>setIsOpen(true)}>Iniciar</button>
        </HomeContent>
        <HomeFooter className="seccond-step">
          <Typography component='p' variant="h5" color='primary'>Caso de dúvida entre em contato!</Typography>
          <span><Phone width={16} height={16}/> {'(99) 99999-9999'} <Mail width={16} height={16}/> adm@adm.com </span>
        </HomeFooter>
      </Containter>
    </>
  )
}
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
            <h1>Bem Vindo ao Bite&Byte</h1>
          </div>
        </HomeImage>
        <HomeContent>
          <img src="https://github.com/PedroHenriqueSBer/OdontoAtex/blob/HomePage/frontend/src/assets/icon.png?raw=true" alt="" />
          <h1>É Bem Simples!</h1>
          <span>
            Uma soluçao fácil e intuitiva de gerenciamento de <br /> triagens, agendamentos, criação e edição dos clientes <br /> da unifenas!
          </span>
          <button onClick={()=>setIsOpen(true)}>Iniciar</button>
        </HomeContent>
        <HomeFooter className="seccond-step">
          <h1>Caso de dúvida entre em contato!</h1>
          <span><Phone width={16} height={16}/> {'(99) 99999-9999'} <Mail width={16} height={16}/> adm@adm.com </span>
        </HomeFooter>
      </Containter>
    </>
  )
}
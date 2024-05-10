import { Typography } from "@mui/material"
import { NavHeader } from "../../components/navHeader"
import { Containter, HomeContent, HomeImage } from "./style"

export const Home = () => {
  return (
    <>
      <NavHeader />
      <Containter>
        <HomeImage>
          <div>
            <Typography component='p' variant="h3" color='primary'>Bem Vindo ao Bite&Byte</Typography>
          </div>
        </HomeImage>
        <HomeContent>
          
        </HomeContent>
      </Containter>
    </>
  )
}
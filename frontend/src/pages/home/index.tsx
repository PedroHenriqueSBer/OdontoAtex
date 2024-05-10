import { Typography } from "@mui/material"
import { NavHeader } from "../../components/navHeader"
import { Containter, HomeImage } from "./style"

export const Home = () => {
  return (
    <>
      <NavHeader />
      <Containter>
        <HomeImage>
          <div>
            <Typography component='p' variant="h6" color='primary'>Bem Vindo ao Bite&Byte</Typography>
          </div>
        </HomeImage>
      </Containter>
    </>
  )
}
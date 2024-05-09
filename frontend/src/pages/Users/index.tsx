import { Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import { NavHeader } from "../../components/navHeader"
import { Containter, Content } from "./style"
import { TypeUser } from "../../types/enum"
import { FormCreateUser } from "../../components/FormCreateUser"

export const Users = () => {
  return (
    <>
      <NavHeader />
      <Containter>
        <div className="center">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Content>
                <FormCreateUser />
              </Content>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Content>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography component='p' variant="h5" color='primary'>Ações dos Usuários</Typography>
                  </Grid>
                </Grid>
              </Content>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Content>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography component='p' variant="h5" color='primary'>Gerenciar Usuários</Typography>
                  </Grid>
                </Grid>
              </Content>
            </Grid>
          </Grid>
        </div>
 
      </Containter>
    </>
  )
}
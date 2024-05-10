import { Button, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { NavHeader } from "../../components/navHeader"
import { CardUser, Containter, Content } from "./style"
import { TypeUser } from "../../types/enum"
import { FormCreateUser } from "../../components/FormCreateUser"
import { Ban, Check, Eye, Trash } from "lucide-react"
import { useUser } from "../../context/useUsers"
import { userController } from "../../controllers/userController"
import { IUser } from "../../types/models"
import { useEffect } from "react"

export const Users = () => {

  const {users, setUsers, update} = useUser()

  const retType = (type: TypeUser) => 
    type === TypeUser.SECRETARY
      ? "Secretaria"
      : type === TypeUser.STUDENT
      ? "Estudante"
      : "Professor"

  const disable = (user: IUser) => {
    userController.Disabled(user.id).then(()=>{
      setUsers(users.map(u => {
        if(u.id === user.id)
          u.disabled = !u.disabled
        return u
      }))
    })
  }

  useEffect(()=>{
    update()
  },[])
  

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
                  {users.map(u => 
                    <Grid key={u.id} item xs={12} lg={6}>
                      <CardUser>
                        <div className="content">
                          <div>
                            <h4>{u.name}</h4>
                            <h5>{retType(u.type)}</h5>
                          </div>
                        </div>
                        <div className="content">
                          <Tooltip placement="top" arrow title="Ver Perfil">
                            <IconButton color="primary"><Eye/></IconButton>
                          </Tooltip>
                          <Tooltip placement="top" arrow title={u.disabled? 'Desabilitado' : 'Habilitado'}>
                            <IconButton onClick={() => disable(u)} color={u.disabled? 'error' : 'success'}>{u.disabled? <Ban/> : <Check/>} </IconButton>
                          </Tooltip>
                        </div>
                      </CardUser>
                    </Grid>
                  )}

                </Grid>
              </Content>
            </Grid>
          </Grid>
        </div>
 
      </Containter>
    </>
  )
}
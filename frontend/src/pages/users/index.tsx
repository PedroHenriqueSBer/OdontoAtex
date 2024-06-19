import { Grid, IconButton, Input, Tooltip, Typography } from "@mui/material"
import { CardUser, Containter, Content, InfoContent } from "./style"
import { TypeLog, TypeUser } from "../../types/enum"
import { FormCreateUser, LogCard, NavHeader, UserModal } from "../../components"
import { Ban, Check, Eye, Search } from "lucide-react"
import { useLoading, useUser } from "../../context"
import { ILog, IUser } from "models"
import { useEffect, useState } from "react"
import { useTheme } from "styled-components"
import { logController, userController } from "../../controllers"
import { useWebSocket } from "../../hooks"

export const Users = () => {

  const { setIsLoading } = useLoading()
  const {users, update} = useUser()
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([])
  const [search, setSearch] = useState<string>('')
  const [logs, setLogs] = useState<ILog[]>([])
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const theme = useTheme()

  useWebSocket<ILog>({
    url: 'logs',
    onMessage: (log) => setLogs([log,...logs]),
    onError: (error) => console.log(error)
  })

  const retType = (type: TypeUser) => 
    type === TypeUser.SECRETARY
      ? "Secretaria"
      : type === TypeUser.STUDENT
      ? "Estudante"
      : "Professor"

  const disable = (user: IUser) => {
    setIsLoading(true)
    userController.Disabled(user.id)
      .then(()=>{
        setSelectedUsers(selectedUsers.map(u => {
          if(u.id === user.id)
            u.disabled = !u.disabled
          return u
        }))
        logController.insert({
          title: `Usuário ${user.name} foi ${user.disabled ? 'desabilitado' : 'habilitado'}`,
          message: ``,
          type: TypeLog.SUCCESS
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(()=>{
    setSelectedUsers(users.filter(u => u.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
  },[search, users])

  useEffect(()=>{
    update()
    setSelectedUsers(users)
    logController.getAll().then(setLogs)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <>
      <NavHeader />
      <Containter id="userPage">
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
                  <Grid item xs={12}>
                    <InfoContent>
                      <Grid container spacing={2}>
                        {logs.map(l => 
                          <Grid key={l.id} item xs={12}>
                            <LogCard log={l} />
                          </Grid>
                        )}
                      </Grid>
                    </InfoContent>
                  </Grid>
                </Grid>
              </Content>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Content>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={4}>
                    <Typography component='p' variant="h5" color='primary'>Gerenciar Usuários</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={8}>
                    <Input 
                      size="small"
                      placeholder="Pesquisar..."
                      id="search"
                      startAdornment={<Search style={{padding: '0 0.5rem'}} color={theme.colors.primary} width={18} height={18} />}
                      style={{
                        color: theme.colors.primary,
                      }}
                      onChange={({target: {value}}) => setSearch(value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InfoContent>
                      <Grid container spacing={2}>
                        {selectedUsers.map(u => 
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
                                  <IconButton onClick={() => setSelectedUser(u)} color="primary"><Eye/></IconButton>
                                </Tooltip>
                                <Tooltip placement="top" arrow title={u.disabled? 'Desabilitado' : 'Habilitado'}>
                                  <IconButton onClick={() => disable(u)} color={u.disabled? 'error' : 'success'}>{u.disabled? <Ban/> : <Check/>} </IconButton>
                                </Tooltip>
                              </div>
                            </CardUser>
                          </Grid>
                        )}
                      </Grid>
                    </InfoContent>
                  </Grid>
                  </Grid>
              </Content>
            </Grid>
          </Grid>
        </div>
      </Containter>
      {selectedUser &&
        <UserModal 
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      }

    </>
  )
}
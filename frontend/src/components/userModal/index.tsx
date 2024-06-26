import { Grid, Modal, Typography } from "@mui/material"
import { Container } from "./style"
import { IUserModalProps } from "props"
import { TypeUser } from "../../types/enum"

export const UserModal = ({
  isOpen,
  onClose,
  user
}: IUserModalProps) => {
  const retType = (type: TypeUser) => 
    type === TypeUser.SECRETARY
      ? "Secretaria"
      : type === TypeUser.STUDENT
      ? "Estudante"
      : "Professor"
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={12} md={10}>
              <Typography variant="h5" component="p" color="primary">{user.name}</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" component="p">{retType(user.type)}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" component="p" color="primary">Email</Typography>
              <Typography variant="subtitle1" component="p">{user.email}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" component="p" color="primary">Ativo</Typography>
              <Typography variant="subtitle1" component="p">{user.disabled? 'inativo' : 'ativo'}</Typography>
            </Grid>
          </Grid>
          
        </Container>
    </Modal>
  )
}
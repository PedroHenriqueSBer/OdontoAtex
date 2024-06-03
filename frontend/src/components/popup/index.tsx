import { Button, Modal } from "@mui/material"
import { ButtonContent, Container, Content } from "./style"
import { PopupProps } from "props"

export const Popup = ({
  isOpen,
  onClose,
  title,
  isNotDenied,
  description,
  icon: Icon,
  onConfirm,
  onDenied
}: PopupProps) => {
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
        <Container error>
          <h1>{Icon && <Icon width={18} height={18} />} {title}</h1>
          <Content id="popupText">
            {description}
          </Content>
          <ButtonContent>
            <Button onClick={onConfirm} id="confirmPopUp">Confirmar</Button>
            {isNotDenied !== true &&
              <Button color="error" onClick={onDenied}>Negar</Button>
            }
          </ButtonContent>
        </Container>
    </Modal>
  )
}
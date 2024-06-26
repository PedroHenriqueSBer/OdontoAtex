import { Grid, IconButton, Typography } from "@mui/material"
import { LogContainer, LogContent, LogFooter, LogHeader } from "./style"
import { ILogCardProps } from "props"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export const LogCard = ({
  log
}: ILogCardProps) => {
  const [isOpen,setIsOpen] = useState(false)

  return (
    <LogContainer>
      <LogHeader>
        <Typography color='primary' variant="h5" component="p">{log.title}</Typography>
        <IconButton onClick={() => setIsOpen(!isOpen)}>{isOpen? <ChevronDown /> : <ChevronUp />}</IconButton>
      </LogHeader>
      {isOpen && (
        <>
          <LogContent>
            {log.message}
          </LogContent>
          <LogFooter>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography color='primary' variant="h6" component="p">Criado por</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color='primary' variant="h6" component="p">Criado em</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="p">{log.createdBy.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="p">{new Date(log.createdAt).toLocaleDateString()}</Typography>
              </Grid>
            </Grid>
          </LogFooter>
        </>
      )}

    </LogContainer>
  )
}
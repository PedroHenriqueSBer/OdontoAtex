import { ReactNode } from "react"
import { ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider as MUITheProvider } from "@mui/material";
import light from "../styles/themes/light";
import { LoadingHookProvider } from "./useLoading";
import { AuthContextProvider } from "./useAuth";
import { UserContextProvider } from "./useUsers";

const theme = createTheme({
  palette: {
    primary: {
      main: light.colors.primary
    },
    secondary: {
      main: light.colors.secondary
    },
    warning: {
      main: light.colors.yellow
    },
    success: {
      main: light.colors.green
    },
    error: {
      main: light.colors.red
    }
  }
})
interface ProvidersProps {
  children: ReactNode
}

export const Providers = ({children}: ProvidersProps) => {
  return(
    <MUITheProvider theme={theme}>
      <ThemeProvider theme={light}>
        <LoadingHookProvider>
          <AuthContextProvider>
            <UserContextProvider>
              {children}
            </UserContextProvider>
          </AuthContextProvider>
        </LoadingHookProvider>
      </ThemeProvider>
    </MUITheProvider>
  )
}
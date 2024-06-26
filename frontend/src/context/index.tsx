import { ReactNode } from "react"
import { ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider as MUITheProvider } from "@mui/material";
import light from "../styles/themes/light";
import { LoadingHookProvider, useLoading } from "./useLoading";
import { AuthContextProvider, useAuth } from "./useAuth";
import { UserContextProvider, useUser } from "./useUsers";
import { TourContextProvider } from "./tour";

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
              <TourContextProvider>
                {children}
              </TourContextProvider>
            </UserContextProvider>
          </AuthContextProvider>
        </LoadingHookProvider>
      </ThemeProvider>
    </MUITheProvider>
  )
}

export {useAuth, useLoading, useUser}
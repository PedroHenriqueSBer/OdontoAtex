import ReactDOM from 'react-dom/client';

import { GlobalStyle } from './styles/globalStyles';
import { Router } from './router/router';
import { ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider as MUITheProvider } from "@mui/material";
import light from './styles/themes/light';
import { AuthContextProvider } from './context/useAuth';
import { LoadingHookProvider } from './context/useLoading';

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <MUITheProvider theme={theme}>
      <ThemeProvider theme={light}>
        <LoadingHookProvider>
          <AuthContextProvider>
            <Router />
            <GlobalStyle />
          </AuthContextProvider>
        </LoadingHookProvider>
      </ThemeProvider>
    </MUITheProvider>
  </>
);

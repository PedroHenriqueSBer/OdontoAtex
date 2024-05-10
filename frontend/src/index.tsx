import ReactDOM from 'react-dom/client';

import { GlobalStyle } from './styles/globalStyles';
import { Router } from './router/router';
import { Providers } from './context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Providers>
    <Router />
    <GlobalStyle />
  </Providers>
);

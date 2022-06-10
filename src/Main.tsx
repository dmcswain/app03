import { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import getTheme from './theme';
import StoreProvier from 'store/Provider';

interface Props {
   children: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
   const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
   const theme = useMemo(() => getTheme(isDarkMode), [isDarkMode]);

   return (
      <ThemeProvider theme={theme}>
         <BrowserRouter>
            <StoreProvier>
               <CssBaseline />
               {children}
            </StoreProvier>
         </BrowserRouter>
      </ThemeProvider>
   );
};

export default Main;

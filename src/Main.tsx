import { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import getTheme from './theme';
import StoreProvier, { useStore } from 'store/Provider';
import initServer from 'mirage';

const env = process.env.NODE_ENV;

/* 
   If we don't initialize the mirage server in production mode
   We can use mirage only for development and test mode, or only in test mode
   In production mode, we use the real server
   In development mode, we use the mirage server
   But the same endpoints will be used in both cases
   This way we don't need a separate /api/mock endpoint
   But that's for later
   Otherwise the app fail will in production

if (env !== 'production') {
   initServer(env);
}
 */

initServer(env);

interface Props {
   children: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
   return (
      <BrowserRouter>
         <StoreProvier>
            <ThemeContext>
               <CssBaseline />
               {children}
            </ThemeContext>
         </StoreProvier>
      </BrowserRouter>
   );
};

interface TCProps extends Props {
   isDarkMode?: boolean;
}

export const ThemeContext: React.FC<TCProps> = ({ children, isDarkMode }) => {
   const { prefersDarkMode } = useStore();

   // if isDarkMode passed as prop, use it, otherwise use prefersDarkMode
   // i.e. in storybook
   const theme = useMemo(
      () => getTheme(isDarkMode !== undefined ? isDarkMode : prefersDarkMode),
      [prefersDarkMode, isDarkMode]
   );

   return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Main;

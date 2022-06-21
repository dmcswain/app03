import { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import getTheme from './theme';
import StoreProvier, { useStore } from 'store/Provider';

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

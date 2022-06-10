import { createTheme, Theme, ThemeOptions } from '@mui/material';

const baseTheme: ThemeOptions = {};

const darkTheme: ThemeOptions = {
   palette: {
      mode: 'dark',
   },
};

export default function getTheme(isDarkMode: boolean): Theme {
   return createTheme({
      ...baseTheme,
      ...(isDarkMode && darkTheme),
   });
}

import { useCallback, useEffect } from 'react';
import {
   DarkModeOutlined,
   LightModeOutlined,
   LogoutOutlined,
} from '@mui/icons-material';
import { AppBar, Typography, IconButton, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useStore, useDispatch } from 'store/Provider';
import { ToolbarStyle } from './styles';
import usePersistedState from 'hooks/usePersistedState';
import { getUsersAsync, updateUserAsync } from 'api';

export interface TitleBarProps {}

const TitleBar: React.FC<TitleBarProps> = () => {
   const { currentUser, prefersDarkMode } = useStore();
   const dispatch = useDispatch();
   const location = useLocation();
   const [lastUser, setLastUser] = usePersistedState(null);

   useEffect(() => {
      getUsersAsync().then(data => console.table(data?.users));
   }, [currentUser]);

   useEffect(() => {
      if (currentUser) return;
      if (!lastUser) return;

      dispatch({ type: 'login', payload: lastUser });

      // it should only run once
      // but not when the user is logged in
      // and when there is no last user saved
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (!currentUser) return;

      updateUserAsync({
         id: currentUser.id,
         prefersDarkMode,
      }).then(({ user }) => {
         dispatch({ type: 'login', payload: user });
      });

      // update user with new theme preference
      // should call when changing theme and user is logged in
      // can't add currentUser to the deps array
      // it might cause an infinite loop
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch, prefersDarkMode]);

   useEffect(() => {
      if (currentUser) {
         setLastUser(currentUser);
      } else {
         setLastUser(null);
      }
   }, [currentUser, setLastUser]);

   const toggleTheme = useCallback(() => {
      dispatch({ type: 'toggleTheme' });
   }, [dispatch]);

   const handleLogout = useCallback(() => {
      dispatch({ type: 'logout' });
   }, [dispatch]);

   return (
      <AppBar color='transparent'>
         <ToolbarStyle>
            <Box component={Link} to='/' className='logo'>
               <Typography variant='h2'>MuM</Typography>
            </Box>

            <div className='user'>
               {currentUser && (
                  <>
                     <Typography>
                        <strong>{currentUser.full_name}</strong>
                     </Typography>

                     <IconButton onClick={handleLogout}>
                        <LogoutOutlined color='warning' />
                     </IconButton>
                  </>
               )}

               {!currentUser && (
                  <Button
                     component={Link}
                     to='login'
                     state={{ backgroundLocation: location }}
                     variant='outlined'
                     color='inherit'
                  >
                     Login
                  </Button>
               )}

               <IconButton onClick={toggleTheme}>
                  {prefersDarkMode ? (
                     <LightModeOutlined />
                  ) : (
                     <DarkModeOutlined />
                  )}
               </IconButton>
            </div>
         </ToolbarStyle>
      </AppBar>
   );
};

export default TitleBar;

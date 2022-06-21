import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { addUser, getUsers } from 'db';
import usePersistedState from 'hooks/usePersistedState';
import { useDispatch, useStore } from 'store/Provider';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
   const { currentUser, prefersDarkMode } = useStore();
   const dispatch = useDispatch();
   const [lastLoginStatus, setLastLoginStatus] = usePersistedState('out');

   useEffect(() => {
      if (!currentUser) return;

      addUser({
         ...currentUser,
         prefersDarkMode,
      });
   }, [currentUser, prefersDarkMode]);

   useEffect(() => {
      if (currentUser) {
         setLastLoginStatus('in');
      } else {
         setLastLoginStatus('out');
      }
   }, [currentUser, setLastLoginStatus]);

   useEffect(() => {
      if (currentUser) return;
      if (lastLoginStatus === 'out') return;

      const users = getUsers();

      if (!users) return;

      const lastUser = users[users.length - 1];
      dispatch({ type: 'login', payload: lastUser });

      // can't add currentUser here, it should only run once
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <Box
         sx={{
            display: 'flex',
            height: '80vh',
            width: 'inherit',
            alignItems: 'center',
            justifyContent: 'center',
         }}
      >
         <Typography align='center' variant='h2'>
            Home
         </Typography>
      </Box>
   );
};

export default Home;

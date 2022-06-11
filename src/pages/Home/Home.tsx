import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { getUsers } from 'db';
import usePersistedState from 'hooks/usePersistedState';
import { useDispatch, useStore } from 'store/Provider';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
   const { currentUser } = useStore();
   const dispatch = useDispatch();
   const [lastLoginStatus, setLastLoginStatus] = usePersistedState('out');

   useEffect(() => {
      if (currentUser) {
         //@ts-ignore
         setLastLoginStatus('in');
      } else {
         //@ts-ignore
         setLastLoginStatus('out');
      }
   }, [currentUser, setLastLoginStatus]);

   useEffect(() => {
      if (currentUser) return;
      if (!getUsers()) return;
      if (lastLoginStatus === 'out') return;

      const users = getUsers();
      const lastUser = users![users!.length - 1];

      dispatch({ type: 'login', payload: lastUser });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch]);

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

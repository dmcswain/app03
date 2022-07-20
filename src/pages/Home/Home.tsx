import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import usePersistedState from 'hooks/usePersistedState';
import { useDispatch, useStore } from 'store/Provider';
import { getUsersAsync, updateUserAsync } from 'api';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
   const { currentUser, prefersDarkMode } = useStore();
   const dispatch = useDispatch();
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

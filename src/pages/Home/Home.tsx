import useSWR from 'swr';
import { Box, Typography } from '@mui/material';
import fetcher from 'api/fetcher';
import { useEffect } from 'react';
import { useStore } from 'store/Provider';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
   const { currentUser } = useStore();
   const { data, mutate } = useSWR<{ users: I.User[] }>('/api/users', fetcher);

   console.table(data?.users);

   useEffect(() => {
      // revalidate cache when currentUser change
      mutate();
   }, [mutate, currentUser]);

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

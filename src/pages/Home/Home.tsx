import { Box, Typography } from '@mui/material';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
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

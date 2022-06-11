import { useCallback } from 'react';
import { LogoutOutlined } from '@mui/icons-material';
import {
   AppBar,
   Toolbar,
   Typography,
   IconButton,
   styled,
   Button,
   Box,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useStore, useDispatch } from 'store/Provider';

export interface TitleBarProps {}

const TitleBar: React.FC<TitleBarProps> = () => {
   const { currentUser } = useStore();
   const dispatch = useDispatch();
   const location = useLocation();

   const handleLogout = useCallback(() => {
      dispatch({ type: 'logout' });
   }, [dispatch]);

   return (
      <AppBar color='transparent'>
         <ToolbarStyle>
            <Box
               component={Link}
               to='/'
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
               }}
            >
               {/* <Avatar src='logo192.png' alt='logo'>
                  MultiMedia App
               </Avatar> */}
               <Typography variant='h2'>MuM</Typography>
            </Box>

            <div className='user'>
               {currentUser && (
                  <>
                     <Typography>{currentUser.full_name}</Typography>

                     <IconButton onClick={handleLogout}>
                        <LogoutOutlined color='warning' />
                     </IconButton>
                  </>
               )}

               {!currentUser && (
                  //@ts-ignore
                  <Button
                     LinkComponent={Link}
                     to='login'
                     state={{
                        backgroundLocation: location,
                     }}
                     variant='outlined'
                     color='inherit'
                  >
                     Login
                  </Button>
               )}
            </div>
         </ToolbarStyle>
      </AppBar>
   );
};

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   '.user': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
   },
}));

export default TitleBar;

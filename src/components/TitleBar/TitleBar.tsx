import { useCallback } from 'react';
import {
   DarkModeOutlined,
   LightModeOutlined,
   LogoutOutlined,
} from '@mui/icons-material';
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
   const { currentUser, prefersDarkMode } = useStore();
   const dispatch = useDispatch();
   const location = useLocation();

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
                     <Typography>{currentUser.full_name}</Typography>

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

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   '.logo': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
   },
   '.user': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
   },
}));

export default TitleBar;

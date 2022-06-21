import { useCallback, useReducer } from 'react';
import {
   Button,
   Dialog,
   DialogContent,
   DialogTitle,
   styled,
   TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useStore } from 'store/Provider';
import { addUser } from 'db';

export interface LoginDialogProps {}

const LoginDialog: React.FC<LoginDialogProps> = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { prefersDarkMode } = useStore();
   const [open, toggleDialog] = useReducer(state => !state, true);

   const handleClose = useCallback(() => {
      toggleDialog();
      navigate(-1);
   }, [navigate]);

   const handleSubmit = useCallback(
      (event: React.ChangeEvent<HTMLFormElement>) => {
         event.preventDefault();

         const formData = new FormData(event.currentTarget);
         const formEntries = Object.fromEntries(
            formData.entries() as IterableIterator<[string, string]>
         );

         const currentUser = addUser(
            {
               ...formEntries,
               prefersDarkMode,
            } as unknown as I.User,
            true
         );

         dispatch({ type: 'login', payload: currentUser });
         toggleDialog();
         navigate('/', { replace: true });
      },
      [dispatch, navigate, prefersDarkMode]
   );

   return (
      <Dialog maxWidth='sm' fullWidth open={open} onClose={handleClose}>
         <DialogTitle>Login</DialogTitle>

         <DialogContentStyle>
            <form onSubmit={handleSubmit}>
               <TextField
                  className='field'
                  name='username'
                  placeholder='Username'
                  label='Username'
                  required
                  fullWidth
               />

               <TextField
                  className='field'
                  name='password'
                  type='password'
                  placeholder='Password'
                  label='Password'
                  required
                  fullWidth
               />

               <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='large'
               >
                  Login
               </Button>
            </form>
         </DialogContentStyle>
      </Dialog>
   );
};

const DialogContentStyle = styled(DialogContent)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   flexShrink: 0,
   gap: theme.spacing(1),
   '.field': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
   },
}));

export default LoginDialog;

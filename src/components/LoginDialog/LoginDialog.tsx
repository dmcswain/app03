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
import { addUserAsync } from 'api';

export interface LoginDialogProps {}

const LoginDialog: React.FC<LoginDialogProps> = () => {
   const navigate = useNavigate();
   const { prefersDarkMode } = useStore();
   const dispatch = useDispatch();
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

         addUserAsync({
            username: formEntries.username,
            prefersDarkMode,
         }).then(({ user }) => {
            dispatch({ type: 'login', payload: user });
         });

         toggleDialog();
         navigate('/', { replace: true });
      },

      // we don't want to re-call this function every time theme changes
      // only the first time, when loging in
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [dispatch, navigate, toggleDialog]
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

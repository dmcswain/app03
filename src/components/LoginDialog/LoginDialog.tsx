import { useCallback, useReducer } from 'react';
import {
   Box,
   Button,
   Dialog,
   DialogContent,
   DialogTitle,
   TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'store/Provider';
import { addUser } from 'db';

export interface LoginDialogProps {}

const LoginDialog: React.FC<LoginDialogProps> = () => {
   const navigate = useNavigate();
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

         const currentUser = addUser(formEntries as unknown as I.User);

         dispatch({ type: 'login', payload: currentUser });
         toggleDialog();
         navigate('/', { replace: true });
      },
      [dispatch, navigate]
   );

   return (
      <Dialog maxWidth='sm' fullWidth open={open} onClose={handleClose}>
         <DialogTitle>Login</DialogTitle>

         <DialogContent>
            <Box
               component='form'
               onSubmit={handleSubmit}
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexShrink: 0,
                  gap: theme => theme.spacing(1),
               }}
            >
               <TextField
                  sx={{ my: 1 }}
                  name='username'
                  placeholder='Username'
                  label='Username'
                  required
                  fullWidth
               />

               <TextField
                  sx={{ my: 1 }}
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
            </Box>
         </DialogContent>
      </Dialog>
   );
};

export default LoginDialog;

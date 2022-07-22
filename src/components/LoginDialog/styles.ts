import { DialogContent, styled } from '@mui/material';

export const DialogContentStyle = styled(DialogContent)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   flexShrink: 0,
   gap: theme.spacing(1),
   '.field': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
   },
}));

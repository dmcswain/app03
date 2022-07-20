import { styled, Toolbar } from "@mui/material";

export const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
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
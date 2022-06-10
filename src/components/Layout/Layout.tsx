import { Outlet } from 'react-router-dom';
import { Container, Toolbar } from '@mui/material';
import TitleBar from 'components/TitleBar';

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
   return (
      <>
         <TitleBar />

         <Container component='main' maxWidth='lg'>
            <Toolbar />
            <Outlet />
         </Container>
      </>
   );
};

export default Layout;

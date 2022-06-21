import { Route, Routes, useLocation } from 'react-router-dom';
import LoginDialog from 'components/LoginDialog';
import Layout from 'components/Layout';
import Home from 'pages/Home';

function App() {
   const location = useLocation();
   const state = location.state as { backgroundLocation?: Location };

   return (
      <>
         <Routes location={state?.backgroundLocation || location}>
            <Route path='/' element={<Layout />}>
               <Route index element={<Home />} />
               <Route path='login' element={<LoginDialog />} />
            </Route>
         </Routes>
         {state?.backgroundLocation && (
            <Routes>
               <Route path='login' element={<LoginDialog />} />
            </Routes>
         )}
      </>
   );
}

export default App;

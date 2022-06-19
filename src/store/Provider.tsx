import { createContext, useContext, useReducer } from 'react';
import { useMediaQuery } from '@mui/material';
import rootReducer from './root/reducer';
import getInitialState from './root/initialState';

type TDispatchContext = React.Dispatch<I.RootAction>;

const StoreContext = createContext<I.RootState>({} as I.RootState);
const DispatchContext = createContext<TDispatchContext>({} as TDispatchContext);

export const useStore = (): I.RootState => useContext(StoreContext);
export const useDispatch = (): TDispatchContext => useContext(DispatchContext);

interface Props {
   children: React.ReactNode;
}

const StoreProvier: React.FC<Props> = ({ children }) => {
   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
   const [state, dispatch] = useReducer(
      rootReducer,
      getInitialState(prefersDarkMode)
   );

   return (
      <DispatchContext.Provider value={dispatch}>
         <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
      </DispatchContext.Provider>
   );
};

export default StoreProvier;

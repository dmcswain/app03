import { createContext, useContext, useReducer } from 'react';
import rootReducer from './root/reducer';
import initialState from './root/initialState';

type TDispatchContext = React.Dispatch<I.RootAction>;

const StoreContext = createContext<I.RootState>({} as I.RootState);
const DispatchContext = createContext<TDispatchContext>({} as TDispatchContext);

export const useStore = (): I.RootState => useContext(StoreContext);
export const useDispatch = (): TDispatchContext => useContext(DispatchContext);

interface Props {
   children: React.ReactNode;
}

const StoreProvier: React.FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(rootReducer, initialState);

   return (
      <StoreContext.Provider value={state}>
         <DispatchContext.Provider value={dispatch}>
            {children}
         </DispatchContext.Provider>
         ;
      </StoreContext.Provider>
   );
};

export default StoreProvier;

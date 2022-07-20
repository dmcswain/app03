import { useEffect, useState } from 'react';

type T = [I.User | null, React.Dispatch<React.SetStateAction<I.User | null>>];

function usePersistedState(initialValue: I.User | null): T {
   const key = 'mmApp_lastLoggedInUser';

   const [state, setState] = useState<I.User | null>(() => {
      return JSON.parse(localStorage.getItem(key) as string) || initialValue;
   });

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
   }, [key, state]);

   return [state, setState];
}

export default usePersistedState;

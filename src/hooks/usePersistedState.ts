import { useEffect, useState } from 'react';

type T = [string, React.Dispatch<React.SetStateAction<string>>];

function usePersistedState(initialValue: string): T {
   const key = 'mmApp_lastLoginStatus';

   const [state, setState] = useState(() => {
      return localStorage.getItem(key) || initialValue;
   });

   useEffect(() => {
      localStorage.setItem(key, state);
   }, [key, state]);

   return [state, setState];
}

export default usePersistedState;

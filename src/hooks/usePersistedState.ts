import { useEffect, useState } from 'react';

export default function usePersistedState(initialValue: string) {
   const key = 'mmApp_lastLoginStatus';

   const [state, setState] = useState(() => {
      return localStorage.getItem(key) || initialValue;
   });

   useEffect(() => {
      localStorage.setItem(key, state);
   }, [key, state]);

   return [state, setState];
}

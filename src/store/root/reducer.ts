function rootReducer(state: I.RootState, action: I.RootAction): I.RootState {
   const { type } = action;

   function newState(updatedState: Partial<I.RootState>): I.RootState {
      return { ...state, ...updatedState };
   }

   switch (type) {
      case 'login': {
         const prefersDarkMode =
            typeof action.payload?.prefersDarkMode !== 'undefined'
               ? action.payload?.prefersDarkMode
               : state.prefersDarkMode;

         return newState({
            currentUser: {
               ...(action.payload as I.User),
               prefersDarkMode,
            },
            prefersDarkMode,
         });
      }

      case 'logout': {
         return newState({
            currentUser: null,
         });
      }

      case 'toggleTheme': {
         return newState({
            prefersDarkMode: !state.prefersDarkMode,
         });
      }

      default:
         throw new Error('Unexpected action ' + String(type));
   }
}

export default rootReducer;

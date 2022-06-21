function rootReducer(state: I.RootState, action: I.RootAction): I.RootState {
   const { type } = action;

   function newState(updatedState: Partial<I.RootState>): I.RootState {
      return { ...state, ...updatedState };
   }

   switch (type) {
      case 'login': {
         return newState({
            currentUser: action.payload,
            prefersDarkMode: action.payload?.prefersDarkMode,
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

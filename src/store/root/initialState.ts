export interface IRootState {
    currentUser?: I.User | null;
    prefersDarkMode: boolean;
    error: null | unknown;
 }
 
 const getInitialState = (prefersDarkMode: boolean): IRootState => {
    return {
       prefersDarkMode,
       error: null,
    };
 };
 
 export default getInitialState;
 
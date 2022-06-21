type Login = {
    type: 'login';
    payload: I.User | null;
 };
 
 type Logout = {
    type: 'logout';
 };
 
 type ToggleTheme = {
    type: 'toggleTheme';
 };
 
 export type IRootAction = Login | Logout | ToggleTheme;
 
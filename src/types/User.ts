export default interface User {
   ID: number; // comes from localStorageDb
   username: string;
   full_name: string;
   last_login_date: Date;
   prefersDarkMode: boolean;
}

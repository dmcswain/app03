export default interface User {
   id: string; // comes from db
   username: string;
   full_name: string;
   last_login_date: Date;
   prefersDarkMode: boolean;
}

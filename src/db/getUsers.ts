import db from 'db';

export function getUsers(): I.User[] | null {
   if (db.isNew()) return null;

   // db.isNew() only checks whether it's a new database, not whether it's empty
   // more info below
   try {
      return db.queryAll('users', { sort: [['last_login_date', 'ASC']] });
   } catch {
      return null;
   }
}

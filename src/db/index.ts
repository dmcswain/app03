import { capitalize } from '@mui/material';
import localStorageDb from 'localstoragedb';

const db = new localStorageDb('mmApp', localStorage);

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

export function getUserByUsername(username: I.User['username']): I.User | null {
   try {
      return db.queryAll('users', {
         query: { username },
      })[0];
   } catch {
      return null;
   }
}

export function addUser(user: I.User, login?: boolean) {
   const existingUser = getUserByUsername(user.username);

   const prefersDarkMode =
      (login && existingUser && existingUser.prefersDarkMode) ||
      user.prefersDarkMode ||
      false;

   const doc: Partial<I.User> = {
      username: user.username,
      full_name: capitalize(user.username),
      last_login_date: new Date(),
      prefersDarkMode,
   };

   console.log('login', login);
   console.log('prefersDarkMode in addUser', prefersDarkMode);
   console.log('user', user);
   console.log('doc', doc);

   function update() {
      db.insertOrUpdate('users', { username: user.username }, doc);
      db.commit();

      const insertedUser = getUserByUsername(user.username);
      return insertedUser;
   }

   // The db is being created when the app first starts
   // But you may reload the page without creating a user (login)
   // the above if block will never execute again (update: don't need that anymore)
   // And localStorageDb will not create a table if it doesn't exist when updating
   // I didn't find a way to check if the table exists
   // This is a workaround
   // create a table if it throws an error
   try {
      return update();
   } catch {
      db.createTable('users', [
         'username',
         'full_name',
         'last_login_date',
         'prefersDarkMode',
      ]);
      return update();
   }
}

export default db;

import { capitalize } from '@mui/material';
import localStorageDb from 'localstoragedb';

const db = new localStorageDb('mmApp', localStorage);

export function getUsers() {
   if (db.isNew()) return;

   // db.isNew() only checks whether it's a new database, not whether it's empty
   // more info below
   try {
      return db.queryAll('users', { sort: [['last_login_date', 'ASC']] });
   } catch {
      return null;
   }
}

export function getUserByUsername(username: I.User['username']) {
   return db.queryAll('users', {
      query: { username },
   });
}

export function addUser(user: I.User) {
   const doc = {
      username: user.username,
      full_name: capitalize(user.username),
      last_login_date: new Date(),
   };

   if (db.isNew()) {
      db.createTable('users', ['username', 'full_name', 'last_login_date']);
      db.insert('users', doc);

      return db.commit();
   }

   function update() {
      db.insertOrUpdate('users', { username: user.username }, doc);
      db.commit();

      const insertedUser = getUserByUsername(user.username)[0];
      return insertedUser;
   }

   // The db is being created when the app first starts
   // But you may reload the page without creating a user (login)
   // the above if block will never execute again
   // And localStorageDb will not create a table if it doesn't exist when updating
   // I didn't find a way to check if the table exists
   // This is a workaround
   // create a table if it throws an error
   try {
      return update();
   } catch {
      db.createTable('users', ['username', 'full_name', 'last_login_date']);
      return update();
   }
}

export default db;

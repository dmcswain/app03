import db from 'db';

export function getUserByUsername(username: I.User['username']): I.User | null {
   try {
      return db.queryAll('users', {
         query: { username },
      })[0];
   } catch {
      return null;
   }
}

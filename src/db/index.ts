import localStorageDb from 'localstoragedb';

const db = new localStorageDb('mmApp', localStorage);

export { addUser } from './saveUser';
export { getUsers } from './getUsers';
export { getUserByUsername } from './getUserByUsername';

export default db;

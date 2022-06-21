// Using namespace just for global types
// this way you don't have to import types everytime you use them
/* eslint-disable @typescript-eslint/no-namespace */
import { IRootAction } from 'store/root/actionTypes';
import { IRootState } from 'store/root/initialState';
import IUser from './User';

declare global {
   namespace I {
      type RootState = IRootState;
      type RootAction = IRootAction;
      type User = IUser;
   }
}

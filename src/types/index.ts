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

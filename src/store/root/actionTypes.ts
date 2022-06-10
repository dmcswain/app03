type ActionTypes = 'login' | 'logout';

export interface IRootAction {
   type: ActionTypes;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   payload?: { [x: string]: any };
}

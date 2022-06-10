export interface IRootState {
   currentUser?: I.User | null;
   error: null | unknown;
}

const initialState: IRootState = {
   error: null,
};

export default initialState;

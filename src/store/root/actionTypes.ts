type Login = {
   type: 'login';
   payload: I.User;
};

type Logout = {
   type: 'logout';
};

export type IRootAction = Login | Logout;

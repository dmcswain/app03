interface NewUserArgs
   extends Omit<I.User, 'id' | 'full_name' | 'last_login_date'> {}

interface UserResponse {
   user: I.User;
}

export async function addUserAsync(user: NewUserArgs): Promise<UserResponse> {
   return await fetcher('/api/users/new', {
      method: 'POST',
      body: JSON.stringify(user),
   }).catch(console.error);
}

interface UserArgs extends Omit<NewUserArgs, 'username'> {
   id: string;
}

export async function updateUserAsync(user: UserArgs): Promise<UserResponse> {
   return await fetcher(`/api/users/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify(user),
   }).catch(console.error);
}

interface UsersResponse {
   users: Array<I.User>;
}

export async function getUsersAsync(): Promise<UsersResponse> {
   return await fetcher('/api/users').catch(console.error);
}

async function fetcher(url: RequestInfo | URL, options?: RequestInit) {
   return fetch(url, {
      headers: {
         'Content-Type': 'application/json',
      },
      ...options,
   }).then(res => {
      if (res.headers.get('content-type') !== 'application/json') {
         throw new Error('Unexpected content-type');
      }

      return res.json();
   });
}

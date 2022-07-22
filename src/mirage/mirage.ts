import { createServer, Factory, Model } from 'miragejs';
import capitalize from 'utils/capitalize';
import getRandomValue from 'utils/getRandomValue';
import nameToUsername from 'utils/nameToUsername';

export default function initServer(environment = 'test') {
   return createServer({
      environment,

      models: {
         user: Model.extend<Partial<I.User>>({}),
      },

      factories: {
         user: Factory.extend<I.User>({
            id(i) {
               return i.toString();
            },
            full_name(i): string {
               return `User ${i}`;
            },
            username() {
               return nameToUsername(this.full_name.toString());
            },
            prefersDarkMode() {
               const mode = getRandomValue(['light', 'dark']);
               return mode === 'dark';
            },
            last_login_date: new Date(),
         }),
      },

      seeds(server) {
         // creating some dummy users with the factories defined above
         // you can login with their username (console)
         // change theme preference
         // new users will join this list
         // check the console for logs and tables of users

         server.createList('user', 5);
         console.log('initial users:', server.db.dump());

         // these users are not gonna be used in the tests
         // each test should call server.createList() on their own
         // see mirage.test.ts
         // it's controlled by the 'environment' parameter
      },

      routes() {
         this.namespace = 'api';

         // we don't need to do this
         // test can call the same endpoint as the production
         // see Main.tsx
         // this.get('/mock/users');
         // this.get('/mock/users/:id');

         this.get('/users');
         this.get('/users/:id');
         this.post('/users/new', (schema, request) => {
            const user = JSON.parse(request.requestBody) as I.User;

            const doc: Partial<I.User> = {
               username: user.username,
               full_name: capitalize(user.username),
               last_login_date: new Date(),
               prefersDarkMode: user.prefersDarkMode,
            };

            const existingUser = schema.findBy('user', {
               username: user.username,
            });

            if (existingUser) {
               doc.prefersDarkMode = existingUser.prefersDarkMode;
               existingUser.update(doc);

               return existingUser;
            }

            return schema.create('user', doc);
         });

         this.patch('/users/:id', (schema, request) => {
            const user = JSON.parse(request.requestBody) as I.User;
            const id = request.params.id;

            const doc: Partial<I.User> = {
               last_login_date: new Date(),
               prefersDarkMode: user.prefersDarkMode,
            };

            const existingUser = schema.find('user', id);

            existingUser?.update(doc);
            return existingUser;
         });
      },
   });
}

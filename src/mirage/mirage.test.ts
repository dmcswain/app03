import { Server } from 'miragejs';
import initServer from 'mirage';

let server: Server;

beforeEach(() => {
   server = initServer('test');
});

afterEach(() => {
   server.shutdown();
});

describe('Mirage', () => {
   it('creates a list of 3 dumb user', () => {
      server.createList('user', 3);

      expect(server.db.users).toHaveLength(3);
      expect(server.db.users.find(0).username).toBe('user0');
   });

   it('creates a new user', () => {
      server.create('user', {
         username: 'test',
         full_name: 'Test',
         prefersDarkMode: true,
      } as Partial<I.User>);

      expect(server.db.users).toHaveLength(1);
      expect(server.db.users.find(0).username).toBe('test');
      expect(server.db.users.find(0).full_name).toBe('Test');
   });
});

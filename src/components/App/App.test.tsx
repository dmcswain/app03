import { render } from '@testing-library/react';
import Main from 'Main';
import App from './App';

test('renders app', () => {
   const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Main>{children}</Main>
   );

   const { asFragment } = render(<App />, { wrapper });

   expect(asFragment()).toMatchSnapshot();
});

import { render, screen } from '@testing-library/react';
import Main from 'Main';
import LoginDialog, { LoginDialogProps } from './LoginDialog';

describe('LoginDialog', () => {
   const defaultProps: LoginDialogProps = {};

   it('should render', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
         <Main>{children}</Main>
      );

      const props = { ...defaultProps };
      const { asFragment } = render(<LoginDialog {...props} />, { wrapper });

      expect(asFragment()).toMatchSnapshot();
      expect(screen.getAllByText('Login')).toBeTruthy();
   });
});

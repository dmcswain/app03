import { render, screen } from '@testing-library/react';
import Main from 'Main';
import TitleBar, { TitleBarProps } from './TitleBar';

describe('TitleBar', () => {
   const defaultProps: TitleBarProps = {};

   it('should render', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
         <Main>{children}</Main>
      );
      const props = { ...defaultProps };
      const { asFragment } = render(<TitleBar {...props} />, { wrapper });

      expect(asFragment()).toMatchSnapshot();
      expect(screen.getByText('Login')).toBeTruthy();
   });
});

import { render, screen } from '@testing-library/react';
import Main from 'Main';
import Layout, { LayoutProps } from './Layout';

describe('Layout', () => {
   const defaultProps: LayoutProps = {};

   it('should render', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
         <Main>{children}</Main>
      );

      const props = { ...defaultProps };
      const { asFragment } = render(<Layout {...props} />, { wrapper });

      expect(asFragment()).toMatchSnapshot();
      expect(screen.getByText('MuM')).toBeTruthy();
   });
});

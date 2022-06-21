import { render, screen } from '@testing-library/react';
import Home, { HomeProps } from './Home';

describe('Home', () => {
    const defaultProps: HomeProps = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment } = render(<Home {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(screen.getByText('Home')).toBeTruthy();
    });
});

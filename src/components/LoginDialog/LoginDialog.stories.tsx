import { Story, ComponentMeta } from '@storybook/react';
import Main from 'Main';
import LoginDialog from './LoginDialog';

export const Default = () => <LoginDialog />;

Default.decorators = [
   (Story: Story) => (
      <Main>
         <Story />
      </Main>
   ),
];

export default {
   component: LoginDialog,
} as ComponentMeta<typeof LoginDialog>;

import { ComponentMeta } from '@storybook/react';
import LoginDialog from './LoginDialog';

export const Default = () => <LoginDialog />;

export default {
   component: LoginDialog,
} as ComponentMeta<typeof LoginDialog>;

import { StorybookConfig } from '@storybook/core-common';

const config: StorybookConfig = {
   core: {
      builder: 'webpack5',
   },
   framework: '@storybook/react',
   stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
   staticDirs: ['../public'],
   addons: [
      '@storybook/preset-create-react-app',
      '@storybook/addon-essentials',
      '@storybook/addon-actions',
   ],
};

module.exports = config;

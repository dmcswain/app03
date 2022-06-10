module.exports = {
   core: {
      builder: 'webpack5',
   },
   stories: ['../src/**/*.stories.tsx'],
   addons: [
      '@storybook/preset-create-react-app',
      '@storybook/addon-essentials',
      '@storybook/addon-actions',
   ],
};

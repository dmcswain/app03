//@ts-check

import {
   Story,
   StoryContext,
   DecoratorFn,
   GlobalTypes,
} from '@storybook/react';
import Main, { ThemeContext } from '../src/Main';
import getTheme from '../src/theme';

export const globalTypes = {
   theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'Light',
      toolbar: {
         icon: 'circlehollow',
         items: ['Light', 'Dark'],
         showName: true,
         dynamicTitle: true,
      },
   },
};

const withThemeProvider: DecoratorFn = (Story, context) => {
   const isDarkMode = context.globals.theme === 'Dark' ? true : false;

   return (
      <Main>
         {/* this ThemeContext will override the one inside Main Provider */}
         <ThemeContext isDarkMode={isDarkMode}>
            <Story {...context} />
         </ThemeContext>
      </Main>
   );
};

export const decorators = [withThemeProvider];

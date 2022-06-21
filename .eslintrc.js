module.exports = {
   env: {
      browser: true,
      es6: true,
      node: true,
   },
   extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'airbnb/hooks',
      'prettier',
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
   },
   plugins: ['react', '@typescript-eslint'],
   rules: {
      'react/jsx-no-undef': 'error',
      'no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
      'import/extensions': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      'react/prop-types': 'off',
   },
   settings: {
      react: {
         version: 'detect',
      },
      'import/resolver': {
         typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
      },
   },
};

// "eslintConfig": {
//    "extends": [
//       "react-app",
//       "react-app/jest"
//    ],
//    "rules": {
//       "import/no-anonymous-default-export": 0
//    }
// },

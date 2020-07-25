module.exports = {
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
  },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};

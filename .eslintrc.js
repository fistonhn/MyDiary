module.exports = {
  extends: ['airbnb-base'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6
  },
  env: {
    mocha: true,
    "browser": true,
    "node": true
  },
  rules: {
    'linebreak-style': 'off',
    'no-console': 'off',
    'camelcase': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'consistent-return': 'off',
    'prefer-const': 'off',
    'no-param-reassign': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-syntax': 'off',
    'no-unreachable': 'off',
    'no-useless-catch': 'off',
    'import/prefer-default-export':'off',
    'object-curly-newline':'off', 
    'no-shadow':'off',
    'max-len':'off',
 }
};

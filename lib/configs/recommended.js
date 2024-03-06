// @ts-check
'use strict';

/** @type {import('eslint').Linter.Config}*/
module.exports = {
  plugins: ['ben'],
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
  rules: {
    'ben/no-lodash': 'warn',
    'ben/no-moment': 'warn',
    'ben/no-circular-dependencies': 'error',
  },
};

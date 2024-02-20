// @ts-check
'use strict';

/** @type {import('eslint').Linter.Config}*/
module.exports = {
  plugins: ['ben'],
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
  rules: {
    'ben/ban-lodash': 'warn',
    'ben/ban-moment': 'warn',
  },
};

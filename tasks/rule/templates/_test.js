/**
 * @fileoverview <%= ruleDescription %>
 * @author <%= authorName %>
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/<%= ruleId %>'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

ruleTester.run('<%= ruleId %>', rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],
  invalid: [
    {
      code: '<%= invalidCode %>',
      errors: [{ messageId: 'anyMessageIdHere' }], // comes from the rule file
    },
  ],
});
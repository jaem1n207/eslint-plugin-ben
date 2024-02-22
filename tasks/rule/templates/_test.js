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
  /**
   * 👉 Please read this and delete this entire comment block.
   * This is an example test for a rule that reports an error in case a named export is called 'wrong'
   * Use https://eslint.org/docs/developer-guide/working-with-rules for Eslint API reference
   */
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
/**
 * @fileoverview <%= ruleDescription %>
 * @author <%= authorName %>
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { test } = require('../../utils');
const rule = require('../../../lib/rules/<%= ruleId %>'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run('<%= ruleId %>', rule, {
  valid: [].concat(
    test({
      code: '' // give me some code that won't trigger a warning
    })
  ),
  invalid: [].concat(
    test({
      code: '<%= invalidCode %>',
      errors: [{ messageId: 'anyMessageIdHere' }], // comes from the rule file
    }),
  )
});
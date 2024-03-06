/**
 * @fileoverview prefer date-fns to moment for better tree-shaking support
 * @author ben
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { test } = require('../../utils');
const rule = require('../../../lib/rules/no-moment'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run('no-moment', rule, {
  valid: [].concat(
    test({
      code: "import moment from 'date-fns';",
    }),
    test({
      code: "import moment, { Moment } from 'date-fns';",
    }),
    test({
      code: "import { format } from 'date-fns';",
    }),
  ),
  invalid: [].concat(
    test({
      code: "import moment from 'moment';",
      errors: [{ messageId: 'preferDateFns', type: 'ImportDeclaration' }],
      output: "import moment from 'date-fns';",
    }),
    test({
      code: "import moment, { Moment } from 'moment';",
      errors: [{ messageId: 'preferDateFns', type: 'ImportDeclaration' }],
      output: "import moment, { Moment } from 'date-fns';",
    }),
  ),
});

/**
 * @fileoverview prefer date-fns to moment for better tree-shaking support
 * @author ben
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/ban-moment'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ERROR_MESSAGE = '"moment" 대신 "date-fns"를 사용해주세요.';

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

ruleTester.run('ban-moment', rule, {
  valid: [
    "import moment from 'date-fns';",
    "import moment, { Moment } from 'date-fns';",
    "import { format } from 'date-fns';",
  ],
  invalid: [
    {
      code: "import moment from 'moment';",
      errors: [{ message: ERROR_MESSAGE, type: 'ImportDeclaration' }],
      output: "import moment from 'date-fns';",
    },
    {
      code: "import moment, { Moment } from 'moment';",
      errors: [{ message: ERROR_MESSAGE, type: 'ImportDeclaration' }],
      output: "import moment, { Moment } from 'date-fns';",
    },
  ],
});

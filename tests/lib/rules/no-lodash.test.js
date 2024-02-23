/**
 * @fileoverview prefer lodash-es to lodash for better tree-shaking support
 * @author ben
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-lodash'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

ruleTester.run('no-lodash', rule, {
  valid: [
    "import _ from 'lodash-es';",
    "import { isEqual } from 'lodash-es';",
    "import { isEqual as eq } from 'lodash-es';",
    "import _, { isEqual, debounce } from 'lodash-es';",
  ],
  invalid: [
    {
      // 기본 lodash import를 lodash-es로 변경
      code: "import _ from 'lodash';",
      errors: [{ messageId: 'esmMessage' }],
      output: "import _ from 'lodash-es';",
    },
    {
      code: "import * as _ from 'lodash';",
      errors: [{ messageId: 'esmMessage' }],
      output: "import * as _ from 'lodash-es';",
    },
    {
      // lodash의 하위 경로 import를 lodash-es로 변경
      code: "import isEqual from 'lodash/isEqual';",
      errors: [{ messageId: 'esmMessage' }],
      output: "import { isEqual } from 'lodash-es';",
    },
    {
      code: "import eq from 'lodash/isEqual';",
      errors: [{ messageId: 'esmMessage' }],
      output: "import { isEqual as eq } from 'lodash-es';",
    },
    {
      // lodash의 다른 하위 경로 import를 lodash-es로 변경
      code: "import debounce from 'lodash/debounce';",
      errors: [{ messageId: 'esmMessage' }],
      output: "import { debounce } from 'lodash-es';",
    },
    {
      // default, named import를 포함한 혼합 import를 lodash-es로 변경
      code: "import _, { isEqual, debounce } from 'lodash';",
      errors: [{ messageId: 'esmMessage' }],
      output: "import _, { isEqual, debounce } from 'lodash-es';",
    },
    {
      // require 문법을 사용하는 경우
      code: "const _ = require('lodash');",
      errors: [
        {
          messageId: 'cjsMessage',
        },
      ],
      output: null,
    },
  ],
});

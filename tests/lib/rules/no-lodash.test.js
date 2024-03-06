/**
 * @fileoverview prefer lodash-es to lodash for better tree-shaking support
 * @author ben
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { test } = require('../../utils');
const rule = require('../../../lib/rules/no-lodash'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run('no-lodash', rule, {
  valid: [].concat(
    test({
      code: "import _ from 'lodash-es';",
    }),
    test({
      code: "import { isEqual } from 'lodash-es';",
    }),
    test({
      code: "import { isEqual as eq } from 'lodash-es';",
    }),
    test({
      code: "import _, { isEqual, debounce } from 'lodash-es';",
    }),
  ),
  invalid: [].concat(
    test({
      // 기본 lodash import를 lodash-es로 변경
      code: "import _ from 'lodash';",
      errors: [{ messageId: 'esmMessage' }],
      output: "import _ from 'lodash-es';",
    }),
    test({
      code: "import * as _ from 'lodash';",
      errors: [{ messageId: 'esmMessage' }],
      output: "import * as _ from 'lodash-es';",
    }),
    // lodash의 하위 경로 import를 lodash-es로 변경
    test({
      code: "import isEqual from 'lodash/isEqual';",
      errors: [{ messageId: 'esmMessage' }],
      output: "import { isEqual } from 'lodash-es';",
    }),
    test({
      code: "import eq from 'lodash/isEqual';",
      errors: [{ messageId: 'esmMessage' }],
      output: "import { isEqual as eq } from 'lodash-es';",
    }),
    test({
      // lodash의 다른 하위 경로 import를 lodash-es로 변경
      code: "import debounce from 'lodash/debounce';",
      errors: [{ messageId: 'esmMessage' }],
      output: "import { debounce } from 'lodash-es';",
    }),
    test({
      // default, named import를 포함한 혼합 import를 lodash-es로 변경
      code: "import _, { isEqual, debounce } from 'lodash';",
      errors: [{ messageId: 'esmMessage' }],
      output: "import _, { isEqual, debounce } from 'lodash-es';",
    }),
    // require 문법을 사용하는 경우
    test({
      code: "const _ = require('lodash');",
      errors: [
        {
          messageId: 'cjsMessage',
        },
      ],
      output: null,
    }),
  ),
});

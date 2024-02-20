/**
 * @fileoverview prefer lodash-es to lodash for better tree-shaking support
 * @author ben
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/ban-lodash'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ESM_ERROR_MESSAGE = '"lodash" 대신 "lodash-es"를 사용해주세요.';
const CJS_ERROR_MESSAGE = 'lodash-es는 esm 모듈만 지원하는 프로젝트에서 가능합니다.';

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

ruleTester.run('ban-lodash', rule, {
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
      errors: [{ message: ESM_ERROR_MESSAGE }],
      output: "import _ from 'lodash-es';",
    },
    {
      code: "import * as _ from 'lodash';",
      errors: [{ message: ESM_ERROR_MESSAGE }],
      output: "import * as _ from 'lodash-es';",
    },
    {
      // lodash의 하위 경로 import를 lodash-es로 변경
      code: "import isEqual from 'lodash/isEqual';",
      errors: [{ message: ESM_ERROR_MESSAGE }],
      output: "import { isEqual } from 'lodash-es';",
    },
    {
      code: "import eq from 'lodash/isEqual';",
      errors: [{ message: ESM_ERROR_MESSAGE }],
      output: "import { isEqual as eq } from 'lodash-es';",
    },
    {
      // lodash의 다른 하위 경로 import를 lodash-es로 변경
      code: "import debounce from 'lodash/debounce';",
      errors: [{ message: ESM_ERROR_MESSAGE }],
      output: "import { debounce } from 'lodash-es';",
    },
    {
      // default, named import를 포함한 혼합 import를 lodash-es로 변경
      code: "import _, { isEqual, debounce } from 'lodash';",
      errors: [{ message: ESM_ERROR_MESSAGE }],
      output: "import _, { isEqual, debounce } from 'lodash-es';",
    },
    {
      // require 문법을 사용하는 경우
      code: "const _ = require('lodash');",
      errors: [
        {
          message: CJS_ERROR_MESSAGE,
        },
      ],
      output: null,
    },
  ],
});

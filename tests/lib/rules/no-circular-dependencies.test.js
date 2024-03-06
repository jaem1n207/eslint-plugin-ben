/**
 * @fileoverview Test cases for ben/no-circular-dependencies rule
 * @author CursorBot
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { test: _test } = require('../../utils');
const rule = require('../../../lib/rules/no-circular-dependencies'),
  RuleTester = require('eslint').RuleTester;

const test = (def) =>
  _test(
    Object.assign(def, {
      filename: 'circular-dependencies/depth-zero.mjs',
    }),
  );

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run('ben/no-circular-dependencies', rule, {
  valid: [].concat(
    test({
      code: 'import foo from "./foo.js"',
    }),
    test({ code: 'import _ from "lodash"' }),
    test({ code: 'import foo from "@scope/foo"' }),
    test({ code: 'var _ = require("lodash")' }),
    test({ code: 'var find = require("lodash.find")' }),
    test({ code: 'var foo = require("./foo")' }),
    test({ code: 'var foo = require("../foo")' }),
    test({ code: 'var foo = require("foo")' }),
    test({ code: 'var foo = require("./")' }),
    test({ code: 'var foo = require("@scope/foo")' }),
    test({ code: 'var bar = require("./bar/index")' }),
    test({ code: 'var bar = require("./bar")' }),
    test({
      code: 'var bar = require("./bar")',
      filename: '<text>',
    }),
  ),
  invalid: [],
});

/**
 * @fileoverview ben style guide
 * @author eslint-plugin-ben
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const recommended = require('./configs/recommended');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports.configs = {
  recommended,
};

module.exports.rules = {
  'no-lodash': require('./rules/no-lodash'),
  'no-moment': require('./rules/no-moment'),
  'no-circular-dependencies': require('./rules/no-circular-dependencies'),
};

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
  'ban-lodash': require('./rules/ban-lodash'),
  'ban-moment': require('./rules/ban-moment'),
};

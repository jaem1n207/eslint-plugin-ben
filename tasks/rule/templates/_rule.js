// @ts-check
/**
 * @fileoverview <%= ruleDescription %>
 * @author <%= authorName %>
 */
'use strict';

const docsUrl = require('../docsUrl');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    messages: {
      anyMessageIdHere: 'Fill me in',
    },
    docs: {
      description: '<%= ruleDescription %>',
      recommended: false,
      url: docsUrl('<%- ruleId %>'),
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create: function (context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      /**
       * 👉 Please read this and then delete this entire comment block.
       *
       * Keep in mind that sometimes AST nodes change when in javascript or typescript format. For example, the type of "declaration" from "export default {}" is ObjectExpression but in "export default {} as SomeType" is TSAsExpression.
       *
       * Use https://eslint.org/docs/developer-guide/working-with-rules for Eslint API reference
       * And check https://astexplorer.net/ to help write rules
       */
    };
  },
};
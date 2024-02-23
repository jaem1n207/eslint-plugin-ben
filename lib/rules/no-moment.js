// @ts-check
/**
 * @fileoverview prefer date-fns to moment for better tree-shaking support
 * @author ben
 */
'use strict';

const docsUrl = require('../docsUrl');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      preferDateFns: '"moment" 대신 "date-fns"를 사용해주세요.',
    },
    docs: {
      description: 'prefer date-fns to moment for better tree-shaking support',
      recommended: true,
      url: docsUrl('no-moment'),
    },
    fixable: 'code',
    schema: [],
  },

  create: function (context) {
    return {
      ImportDeclaration(node) {
        const sourceValue = node.source.value;
        if (typeof sourceValue === 'string' && sourceValue?.match(/^moment($|\/)/)) {
          context.report({
            node,
            messageId: 'preferDateFns',
            fix(fixer) {
              const newSource = sourceValue.replace('moment', 'date-fns');
              return fixer.replaceText(node.source, `'${newSource}'`);
            },
          });
        }
      },
    };
  },
};

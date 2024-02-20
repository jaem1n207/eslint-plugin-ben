// @ts-check
/**
 * @fileoverview prefer lodash-es to lodash for better tree-shaking support
 * @author ben
 */
'use strict';

const { isValidString } = require('../assertions');
const docsUrl = require('../docsUrl');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    messages: {
      esmMessage: '"lodash" 대신 "lodash-es"를 사용해주세요.',
      cjsMessage: 'lodash-es는 esm 모듈만 지원하는 프로젝트에서 가능합니다.',
    },
    docs: {
      description: 'prefer lodash-es to lodash for better tree-shaking support',
      recommended: true,
      url: docsUrl('ban-lodash'),
    },
    fixable: 'code',
    schema: [],
  },

  create: function (context) {
    return {
      ImportDeclaration(node) {
        const sourceValue = node.source.value;
        const isLodashMain = sourceValue === 'lodash';
        const isLodashSubModule = isValidString(sourceValue) && sourceValue.startsWith('lodash/');

        if (isLodashMain || isLodashSubModule) {
          context.report({
            node,
            messageId: 'esmMessage',
            fix(fixer) {
              if (isLodashMain) {
                return fixer.replaceText(node.source, `'lodash-es'`);
              } else {
                const importedName = sourceValue.split('/')[1];
                const localName = node.specifiers[0].local.name;
                const importStatement =
                  localName === importedName
                    ? `import { ${importedName} } from 'lodash-es';`
                    : `import { ${importedName} as ${localName} } from 'lodash-es';`;
                return fixer.replaceText(node, importStatement);
              }
            },
          });
        }
      },
      CallExpression(node) {
        if (
          // @ts-ignore
          node.callee.name === 'require' &&
          node.arguments.length === 1 &&
          // @ts-ignore
          node.arguments[0].value === 'lodash'
        ) {
          context.report({
            node: node.callee,
            messageId: 'cjsMessage',
          });
        }
      },
    };
  },
};

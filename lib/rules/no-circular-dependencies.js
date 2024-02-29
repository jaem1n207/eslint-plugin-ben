// @ts-check
/**
 * @fileoverview detect circular dependencies between modules
 * @author ben
 */
'use strict';

const docsUrl = require('../docsUrl');
const { getOption } = require('../settings');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    messages: {
      circularDependencyDetected: 'Circular dependency detected: {{path}}',
    },
    docs: {
      description: 'detect circular dependencies between modules',
      recommended: true,
      url: docsUrl('no-circular-dependencies'),
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          maxDepth: {
            type: 'number',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function (context) {
    const maxDepth = getOption(context, 'maxDepth') ?? 0;
    /**
     * @type {Map<string, Set<string>>}
     */
    const dependencyGraph = new Map();
    const filePath = context.filename;

    /**
     * @param {string} from
     * @param {string} to
     */
    const addDependency = (from, to) => {
      if (!dependencyGraph.has(from)) {
        dependencyGraph.set(from, new Set());
      }
      dependencyGraph.get(from)?.add(to);
    };

    /**
     * @param {string} moduleName
     * @param {Set<string>} visited
     * @param {number} depth
     */
    const checkForCircularDependency = (moduleName, visited = new Set(), depth = 0) => {
      if (depth > maxDepth) {
        return;
      }

      if (visited.has(moduleName)) {
        context.report({
          message: `Circular dependency detected: ${[...visited, moduleName].join(' -> ')}`,
          loc: {
            start: { line: 1, column: 0 },
            end: { line: 1, column: 0 },
          },
        });
        return;
      }

      visited.add(moduleName);
      if (dependencyGraph.has(moduleName)) {
        for (const dependency of dependencyGraph.get(moduleName) || []) {
          checkForCircularDependency(dependency, new Set(visited), depth + 1);
        }
      }
    };

    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (typeof source !== 'string') return;

        addDependency(filePath, source);
        checkForCircularDependency(source);
      },
      'Program:exit'() {
        dependencyGraph.clear();
      },
    };
  },
};

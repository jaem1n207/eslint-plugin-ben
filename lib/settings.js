/**
 * @typedef Options
 * @property {number} maxDepth
 *
 * @param {import('eslint').Rule.RuleContext} context
 * @param {keyof Options} name
 * @returns {Options[keyof Options]}
 */
const getOption = (context, name) => {
  const options = context.options[0] || {};
  if (options[name] != null) return options[name];

  /**
   * @type {Record<keyof Options, any>}
   */
  const defaultOptions = {
    maxDepth: Number.MAX_SAFE_INTEGER,
  };

  return defaultOptions[name];
};

module.exports = {
  getOption,
};

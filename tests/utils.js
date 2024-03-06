const path = require('path');

const testFilePath = (relativePath) => {
  return path.join(process.cwd(), './tests/files', relativePath);
};

const test = (t) => {
  return {
    ...t,
    filename: testFilePath(t.filename ?? 'foo.js'),
    parserOptions: { ecmaVersion: 2020, sourceType: 'module', ...t.parserOptions },
  };
};

module.exports = {
  testFilePath,
  test,
};

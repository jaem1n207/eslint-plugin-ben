const { exec } = require('node:child_process');
const util = require('node:util');
const execAsync = util.promisify(exec);

const { createTask } = require('./task');

const bundleRspack = async ({ debug }) => {
  const env = debug ? 'development' : 'production';
  const { stderr } = await execAsync(`NODE_ENV=${env} rspack build -c tasks/rspack.config.js`);
  if (stderr) {
    throw new Error(stderr);
  }
};

const bundleRspackTask = createTask('rspack-build', bundleRspack);

module.exports = bundleRspackTask;

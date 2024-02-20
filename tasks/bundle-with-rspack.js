const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

const { createTask } = require('./task');

const bundleRspack = async ({ debug }) => {
  const env = debug ? 'development' : 'production';
  const { stdout, stderr } = await execAsync(
    `NODE_ENV=${env} rspack build -c tasks/rspack.config.js`,
  );
  if (stderr) {
    throw new Error(stderr);
  }
  console.log(stdout);
};

const bundleRspackTask = createTask('rspack-build', bundleRspack);

module.exports = bundleRspackTask;

const { removeFolder } = require('./utils');
const { createTask } = require('./task');

const PATHS = ['build', 'debug'];

const clean = async ({ debug }) => {
  const tasks = PATHS.map((path) => removeFolder(path, debug));
  await Promise.all(tasks);
};

const cleanTask = createTask('clean', clean);

module.exports = cleanTask;

// @ts-check
'use strict';

// eslint-disable-next-line node/no-unpublished-require
const chalk = require('chalk');

const cleanTask = require('./clean');
const { runTasks } = require('./task');
const rspackBuildTask = require('./bundle-with-rspack');

const standardTask = [cleanTask];

const buildTask = [...standardTask, rspackBuildTask];

const build = async ({ debug }) => {
  console.log(chalk.green(`BUILDING IN ${debug ? 'DEBUG' : 'RELEASE'} MODE`));
  try {
    await runTasks(buildTask, { debug });
    console.log(chalk.green('BUILD SUCCESS!'));
  } catch (error) {
    console.log(error);
    console.error(chalk.red('BUILD FAILED!'));
    throw error;
  }
};

const run = async ({ debug }) => {
  await build({ debug });
};

const getParams = (args) => {
  const debug = args.includes('--debug');

  return { debug };
};

const args = process.argv.slice(2);
const params = getParams(args);
run(params);

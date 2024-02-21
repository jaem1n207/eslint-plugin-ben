// @ts-check
'use strict';

const chalk = require('chalk');

const { logWithTime } = require('./utils');

/**
 * @typedef TaskOptions
 * @property {boolean} debug
 */
class Task {
  /**
   * @param {string} name
   * @param {(options: TaskOptions) => Promise<void>} run
   */
  constructor(name, run) {
    this.name = name;
    this._run = run;
  }

  /**
   * @param {Promise<void>} promise
   */
  async _measureTime(promise) {
    const start = Date.now();
    await promise;
    const end = Date.now();
    logWithTime(`${this.name} (${(end - start).toFixed(0)} ms)`);
  }

  /**
   * @param {TaskOptions} options
   */
  async run(options) {
    await this._measureTime(this._run(options));
  }
}

/**
 * @param {string} name
 * @param {(options: TaskOptions) => Promise<void>} run
 * @returns
 */
const createTask = (name, run) => {
  return new Task(name, run);
};

/**
 * @param {Task[]} tasks
 * @param {TaskOptions} options
 */
const runTasks = async (tasks, options) => {
  for (const task of tasks) {
    try {
      await task.run(options);
    } catch (error) {
      console.error(chalk.red(`${task.name} error\n${error.stack || error}`));
      throw error;
    }
  }
};

module.exports = {
  createTask,
  runTasks,
};

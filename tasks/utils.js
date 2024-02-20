// @ts-check
'use strict';

// eslint-disable-next-line node/no-unpublished-require
const chalk = require('chalk');
const fs = require('node:fs/promises');

/**
 * @param {string} dest
 * @returns {Promise<boolean>}
 */
const pathExists = async (dest) => {
  try {
    await fs.access(dest);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * @param {string} dir
 * @returns {Promise<void>}
 */
const removeFolder = async (dir) => {
  try {
    if (await pathExists(dir)) {
      await fs.rm(dir, { recursive: true });
    }
  } catch (error) {
    console.error(`Error removing folder: ${dir}`);
    console.error(error);
  }
};

/**
 * @param {string} message
 * @returns
 */
const logWithTime = (message) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const leftPad = (/** @type {number} */ num) => String(num).padStart(2, '0');

  return console.log(`${chalk.gray([hours, minutes, seconds].map(leftPad).join(':'))} ${message}`);
};

module.exports = {
  pathExists,
  removeFolder,
  logWithTime,
};

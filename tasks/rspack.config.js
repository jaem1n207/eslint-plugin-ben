// @ts-check
'use strict';

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname,
  entry: {
    index: '../lib/index.js',
  },
  output: {
    path: isProd ? 'build' : 'debug',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : 'eval',
};

module.exports = config;

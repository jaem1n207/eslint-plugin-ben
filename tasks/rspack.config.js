// @ts-check
'use strict';

// eslint-disable-next-line node/no-unpublished-require
const rspack = require('@rspack/core');

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
  plugins: [
    new rspack.CopyRspackPlugin({
      patterns: [{ from: '../docs', to: 'docs' }],
    }),
  ],
};

module.exports = config;

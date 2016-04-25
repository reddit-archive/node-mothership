#!/usr/bin/env node

const argv = require ('yargs').argv;

require('babel-polyfill');

require('babel-register')({
  sourceMap: true,
  presets: [
    'es2015',
  ],
  plugins: [
    'transform-object-rest-spread',
    'transform-async-to-generator',
    'transform-class-properties',
    'syntax-trailing-function-commas',
  ],
});

require('../lib/mothership').default(argv);

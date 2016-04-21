require('babel-polyfill');

require('babel-register')({
  extensions: ['.js', '.es6.js'],
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


require('run.js');

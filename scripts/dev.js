/* Minimal start.js file */

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require('webpack');

const webpackConfigFactory = require('../config/webpack/webpack.config');

// generate webpack config from webpack config factory
const webpackConfig = webpackConfigFactory('development');

const compiler = webpack(webpackConfig);

compiler.watch({
  // Example watchOptions
  aggregateTimeout: 300,
  poll: undefined
}, (err, stats) => {
  // Print watch/build result here...
  console.log(stats);
});


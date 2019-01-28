/* Minimal start.js file */

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const execa = require('execa');
const webpack = require('webpack');
const argv = require('yargs').argv;

require('colors');

let done = false;

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
  if (argv.browser === 'chrome' && !done) {
    done = true;
    execa('node', ['scripts/chrome-launch.js']).stdout.pipe(process.stdout);
  }
  else if (argv.browser === 'firefox') {
    done = true;
    console.log('A new instance of Firefox will open in the background.'.blue.bold);
    execa('web-ext', ['run', '--source-dir', 'dev', '--pref', 'startup.homepage_welcome_url=https://www.youtube.com']);
  }

});


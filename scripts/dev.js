/* Minimal start.js file */

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const Ora = require('ora');
const execa = require('execa');
const chalk = require('chalk');
const webpack = require('webpack');
const argv = require('yargs').argv;
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printBuildError = require('react-dev-utils/printBuildError');

require('colors');

let done = false;

const webpackConfigFactory = require('../config/webpack/webpack.config');

console.log('\n-----------------------------------------------------\n'.yellow.bold);

// generate webpack config from webpack config factory
const webpackConfig = webpackConfigFactory('development');

let spinner = new Ora({
  text: 'Bundling files and asstes using Webpack'.blue,
  stream: process.stdout
});
spinner.start();

const compiler = webpack(webpackConfig);
try {
  compiler.run((err, stats) => {
    spinner.succeed();
    let messages;
    if (err) {
      if (!err.message) {
        throw new Error(err);
      }
      messages = formatWebpackMessages({
        errors: [err.message],
        warnings: [],
      });
    }
    else {
      messages = formatWebpackMessages(
        stats.toJson({ all: false, warnings: true, errors: true })
      );
    }

    if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      console.log(chalk.red('Failed to compile.\n'));
      process.exit(1);
    }
    if (
      process.env.CI &&
      (typeof process.env.CI !== 'string' ||
        process.env.CI.toLowerCase() !== 'false') &&
      messages.warnings.length
    ) {
      console.log(
        chalk.yellow(
          '\nTreating warnings as errors because process.env.CI = true.\n' +
          'Most CI servers set it automatically.\n'
        )
      );
      // throw new Error(messages.warnings.join('\n\n'));
      process.exit(1);
    }



    // choose browser to display
    if (argv.browser === 'chrome' && !done) {
      done = true;
      spinner = new Ora({
        text: 'Opening the extension in a new Chrome instance'.blue,
        stream: process.stdout
      });
      spinner.start();
      execa('node', ['scripts/chrome-launch.js']).stdout.pipe(process.stdout);
    }
    else if (argv.browser === 'firefox') {
      done = true;
      spinner = new Ora({
        text: 'Opening the extension in a new Firefox instance'.blue,
        stream: process.stdout
      });
      spinner.start();
      execa('web-ext', ['run', '--source-dir', 'dev', '--pref', 'startup.homepage_welcome_url=https://www.youtube.com']);
    }

  });
} catch (err) {
  console.log(chalk.red('Failed to compile.\n'));
  console.log(err.message);
  printBuildError(err);
  process.exit(1);
}





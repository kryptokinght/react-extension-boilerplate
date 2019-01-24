/* Minimal start.js file */

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfigFactory = require('../config/webpack/webpack.config');
const createDevServerConfig = require('../config/webpack/webpackDevServer.config');


const webpackConfig = webpackConfigFactory('development');

const compiler = webpack(webpackConfig);
const serverConfig = createDevServerConfig();
const devServer = new WebpackDevServer(compiler, serverConfig);
devServer.listen(3000, 'localhost', (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.cyan('Starting the development server...\n'));
  console.log(chalk.cyan('Open in localhost:3000'));
});
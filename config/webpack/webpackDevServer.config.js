/* Minimal webpack-dev-server config */

const ignoredFiles = require('react-dev-utils/ignoredFiles');
const paths = require('../paths');

const host = process.env.HOST || '0.0.0.0';

module.exports = function () {
  return {
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    watchContentBase: true,
    hot: true,
    publicPath: '/',
    quiet: true,
    watchOptions: {
      ignored: ignoredFiles(paths.appSrc),
    },
    host
  };
};

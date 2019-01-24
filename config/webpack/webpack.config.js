const fs = require('fs');
const path = require('path');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

const paths = require('../paths');
const initLoaders = require('./loaders');
const initPlugins = require('./plugins');
require('../env');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const useTypeScript = fs.existsSync(paths.appTsConfig);



module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  const publicPath = isEnvProduction
    ? paths.servedPath
    : isEnvDevelopment && '/';
  const shouldUseRelativeAssetPaths = publicPath === './';

  const loaders = initLoaders(isEnvProduction, isEnvDevelopment, shouldUseRelativeAssetPaths, shouldUseSourceMap);
  const plugins = initPlugins(isEnvProduction, shouldUseSourceMap);

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction, // stop compilation on the very first error itself
    devtool: isEnvProduction
      ? shouldUseSourceMap ? 'source-map' : false
      : isEnvDevelopment && 'cheap-module-source-map',
    entry: {
      'popup': paths.appPopupJs,
      'sidebar': paths.appSidebarJs,
      'options': paths.appOptionsJs,
      'background': paths.appBackgroundJs,
      'content': paths.appContentJs,
    },
    output: {
      path: isEnvProduction ? paths.appExtension : paths.appDev,
      // pathinfo: isEnvDevelopment,
      filename: '[name].js',
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info => path
          .relative(paths.appSrc, info.absoluteResourcePath)
          .replace(/\\/g, '/')
        : isEnvDevelopment &&
        (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        plugins.terserPlugin,
        plugins.optimizeCSSAssetsPlugin,
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
      }
    },
    resolve: {
      modules: ['node_modules'].concat(
        process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
      ),
      extensions: paths.moduleFileExtensions
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes('ts')),
      plugins: [
        PnpWebpackPlugin,
        plugins.moduleScopePlugin,
      ],
    },
    resolveLoader: {
      plugins: [
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        loaders.eslintLoader,
        {
          // "oneOf" will traverse all following loaders until one will match the requirements. 
          // When no loader matches it will fall back to the "file" loader at the end of the loader list.
          oneOf: [
            loaders.urlLoader,
            loaders.insideBabelLoader,
            loaders.outsideBabelLoader,
            loaders.styleLoader,
            loaders.cssModuleLoader,
            loaders.fileLoader
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ],
    },
    plugins: [
      plugins.optionsHtmlPlugin,
      plugins.popupHtmlPlugin,
      plugins.sidebarHtmlPlugin,
      plugins.htmlIncAssetsPlugin,
      plugins.moduleNotFoundPlugin,
      isEnvDevelopment && plugins.CaseSensitivePathsPlugin,
      isEnvDevelopment && plugins.watchMissingNodeModulesPlugin,
      isEnvProduction && plugins.miniCssExtractPlugin,
      plugins.ignorePlugin,
      plugins.copyPlugin,
    ].filter(Boolean),
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    performance: false,
  };
};

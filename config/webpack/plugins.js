const { IgnorePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlIncAssetsPlugin = require('html-webpack-include-assets-plugin');
const safePostCssParser = require('postcss-safe-parser');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const CopyPlugin = require('copy-webpack-plugin');

const paths = require('../paths');
const staticFiles = require('./static-files');

const minifyHtml = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
};


const getPlugins = (isEnvProduction = false, shouldUseSourceMap = false) => {
  /* HTML Plugins for options, sidebar, options */
  const optionsHtmlPlugin = new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        title: 'Options',
        chunks: ['options'],
        filename: 'options.html',
        template: paths.optionsTemplate,
      },
      isEnvProduction
        ? {
          minify: minifyHtml,
        }
        : undefined
    )
  );

  const popupHtmlPlugin = new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        title: 'Popup',
        chunks: ['popup'],
        filename: 'popup.html',
        template: paths.popupTemplate,
      },
      isEnvProduction
        ? {
          minify: minifyHtml,
        }
        : undefined
    )
  );

  const sidebarHtmlPlugin = new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        title: 'Sidebar',
        chunks: ['sidebar'],
        filename: 'sidebar.html',
        template: paths.sidebarTemplate,
      },
      isEnvProduction
        ? {
          minify: minifyHtml,
        }
        : undefined
    )
  );

  const moduleNotFoundPlugin = new ModuleNotFoundPlugin(paths.appPath);
  const caseSensitivePathsPlugin = new CaseSensitivePathsPlugin();
  const watchMissingNodeModulesPlugin = new WatchMissingNodeModulesPlugin(paths.appNodeModules);
  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: '[name].css',
    // chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
  });
  const ignorePlugin = new IgnorePlugin(/^\.\/locale$/, /moment$/);
  const terserPlugin = new TerserPlugin({
    terserOptions: {
      parse: {
        ecma: 8,
      },
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2,
      },
      mangle: {
        safari10: true,
      },
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true,
      },
    },
    parallel: true,
    cache: true,
    sourceMap: shouldUseSourceMap,
  });
  const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin({
    cssProcessorOptions: {
      parser: safePostCssParser,
      map: shouldUseSourceMap
        ? {
          inline: false,
          annotation: true,
        }
        : false,
    },
  });

  const htmlIncAssetsPlugin = new HtmlIncAssetsPlugin({
    append: false,
    assets: staticFiles.htmlAssets,
  });

  const moduleScopePlugin = new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]);
  const copyPlugin = new CopyPlugin(staticFiles.copyPatterns);
  const friendlyErrorsWebpackPlugin = new FriendlyErrorsWebpackPlugin();

  return {
    optionsHtmlPlugin,
    popupHtmlPlugin,
    sidebarHtmlPlugin,
    moduleNotFoundPlugin,
    caseSensitivePathsPlugin,
    watchMissingNodeModulesPlugin,
    miniCssExtractPlugin,
    ignorePlugin,
    terserPlugin,
    optimizeCSSAssetsPlugin,
    moduleScopePlugin,
    copyPlugin,
    htmlIncAssetsPlugin,
    friendlyErrorsWebpackPlugin
  };
};

module.exports = getPlugins;



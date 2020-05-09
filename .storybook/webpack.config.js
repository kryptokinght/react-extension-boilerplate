const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
module.exports = {
  module: {
    rules: [
      {
        test:  /\.css$/,
        loaders: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent,
            },
          }
        ],
      },
    ],
  },
}
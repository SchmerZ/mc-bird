const path = require('path');
const webpack = require('webpack');

const babelOptions = require('./client.babel.config');
//const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      './src/client/index',
    ],
  },
  output: {
    path: path.join(__dirname, '../dist/client'),
    publicPath: '/',
    filename: path.join('assets', '[name].js'),
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    })
  ],

  optimization: {
    noEmitOnErrors: true,
    concatenateModules: true,

    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules\\[*lodash*|react\-dom\-factories]/,
          name: 'vendors',
          chunks: 'initial'
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions,
        }
      },
    ]
  },
};

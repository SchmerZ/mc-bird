const path = require('path');
const babelOptions = require('./client.babel.config');

const port = 3002;

module.exports = {
  devtool: 'cheap-module-source-map',
  watch: true,
  entry: {
    main: [
      'babel-polyfill',
      './src/client/index',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist', 'client'),
    filename: path.join('assets', '[name].js'),
    publicPath: `http://localhost:${port}/`,
    pathinfo: true,
  },

  plugins: [],

  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    concatenateModules: true,

    minimize: false,
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

  devServer: {
    port,
    contentBase: path.join(__dirname, '../src/client/static'),
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: {
      children: false,
      assets: false,
      chunks: false,
      chunkModules: true,
      modules: false,
      hash: false,
      version: false,
    }
  }
};

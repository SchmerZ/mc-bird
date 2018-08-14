const path = require('path');
const webpack = require('webpack');

const port = 3002;

module.exports = {
  devtool: 'cheap-module-source-map',
  watch: true,
  entry: {
    main: [
      'babel-polyfill',
      //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './src/client/index',
      //path.join(__dirname, 'client', 'main.js')
    ],
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    filename: path.join('assets', '[name].js'),
    publicPath: `http://localhost:${port}/`,
    pathinfo: true,
  },

  plugins: [
  ],

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
          options: {
            babelrc: false,
            cacheDirectory: true,
            presets: [
              [
                'env',
                {
                  modules: false,
                  targets: {
                    browsers: ['last 5 versions', 'ie >= 11']
                  }
                }
              ],
              'react',
            ],
            plugins: [
              'transform-object-rest-spread',
              'transform-class-properties',
            ]
          }
        }
      },
      {
        test: /\.woff2?(\?.+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      // {
      //     test: /\.jsx?$/,
      //     include: path.join(__dirname, 'client'),
      //     loader: ['babel-loader']
      // },
      // {
      //     test: /\.css$/,
      //     loader: ['style-loader', 'css-loader']
      // },
      // {
      //     test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      //     loader: 'file-loader',
      //     options: {
      //         name: 'fonts/[name].[ext]'
      //     }
      // }
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
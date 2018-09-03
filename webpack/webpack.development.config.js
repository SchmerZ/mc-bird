const path = require('path');

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

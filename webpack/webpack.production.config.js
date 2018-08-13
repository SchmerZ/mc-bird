const path = require('path');
const webpack = require('webpack');
//const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: [
            'babel-polyfill',
            './src/client/index',
        ],
    },
    output: {
        path: path.join(__dirname, '../dist/public'),
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
};
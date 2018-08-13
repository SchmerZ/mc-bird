const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// todo (!)

module.exports = (config) => {
    return {
        cache: true,
        devtool: config.devtool,
        entry: {
            'vendor': ['babel-polyfill', 'react'],
            'main': ['./src/client/index']
        },
        output: {
            filename: config.filename,
            path: path.join(__dirname, '../public/assets'),
            publicPath: config.publicPath || '/assets/',
            pathinfo: true,
            chunkFilename: config.chunkFilename,
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
            ].concat(config.rules)
        },

        optimization: config.optimization,

        plugins: [
            // Makes some environment variables available in index.html.
            // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
            // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
            // In development, this will be an empty string.
            // new InterpolateHtmlPlugin(env.raw),

            new CleanWebpackPlugin(['./public/assets'], {
                root: path.join(__dirname, '/..')
            }),
            new ExtractTextPlugin(config.cssFilename),
            // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
            // new webpack.ProvidePlugin({
            //     $: 'jquery',
            //     jQuery: 'jquery',
            //     'window.jQuery': 'jquery',
            // }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                chunkFilename: config.chunkFilename
            }),
            new webpack.optimize.CommonsChunkPlugin({
                children: true,
                async: true,
            }),
        ].concat(config.plugins || []),

        devServer: {
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
    }
};
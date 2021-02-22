const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    entry: [
        // 'react-hot-loader/patch', // For React Application Only
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js' // Code Splitting Feature
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    },
                    'postcss-loader'
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ['autoprefixer'],
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            }
                        }
                    }
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    'vue-style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.svelte$/,
                loader: 'svelte-loader',
                options: {
                    preprocess:  require('svelte-preprocess')({ postcss: true })
                }
            },
            {
                test: /\.ts(x)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [
                        /\.vue$/
                    ]
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts',
                }
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/images',
                }
            },
            {
                test: /\.(webm|mp4)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/videos',
                }
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.mjs',
            '.svelte',
            '.vue'
        ],
        alias: {
            // 'react-dom': '@hot-loader/react-dom', // For React Application Only
            stream: 'stream-browserify'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        // new CopyPlugin({ // For Non React Projects
        //     patterns: [{
        //         from: 'src/*.html',
        //         to: '[name].[ext]',
        //     }]
        // }),
        // new CopyPlugin({
        //     patterns: [{ from: 'src/index.html' }],
        // }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new LodashModuleReplacementPlugin,
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    devServer: {
        contentBase: './dist'
    },
}

module.exports = (env, argv) => {
    if (argv.hot) {
        config.output.filename = '[name].[hash].js';
    }
    return config;
};
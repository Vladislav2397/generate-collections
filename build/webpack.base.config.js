const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const StyleLintPlugin = require('stylelint-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
// const ESLintPlugin = require('eslint-webpack-plugin')

const plugins = [new VueLoaderPlugin()]

if (isProd) {
    plugins.push(
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].min.[chunkhash].css',
        })
    )
} else {
    plugins.push(
        new FriendlyErrorsPlugin()
        // new ESLintPlugin({
        //     extensions: ['.vue', '.ts', 'tsx', 'js', 'jsx'],
        // }),
        // new StyleLintPlugin({
        //     files: ['**/*.{vue,htm,html,sss,less,scss,sass}'],
        //     fix: true,
        // })
    )
}

const scssThemeVars = './src/app/styles/utility/vars/colors.scss'
const scssResources = [scssThemeVars]

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: {
        // critical: './resources/app/styles/critical.scss',
        // main: './resources/app/styles/main.scss'
    },
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx'],
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.svg$/,
                loader: 'vue-svg-loader',
                options: {
                    svgo: {
                        plugins: [
                            { collapseGroups: false },
                            { removeEmptyContainers: false },
                            { cleanupIDs: false },
                            { removeViewBox: false },
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: 'ts-loader',
                    },
                    esModule: true,
                    compilerOptions: {
                        preserveWhitespace: false,
                    },
                },
            },
            {
                test: /\.(jsx?|tsx?)$/,
                exclude:
                    /node_modules\/(?!(twig|twig-drupal-filters|lit-html|lit-element)\/).*/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            appendTsSuffixTo: [/\.vue$/],
                            appendTsxSuffixTo: [/\.vue$/],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]',
                },
            },
            {
                test: /\.scss$/,
                use: isProd
                    ? [
                          MiniCssExtractPlugin.loader,
                          'css-loader',
                          {
                              loader: 'postcss-loader',
                              options: {
                                  sourceMap: true,
                                  config: {
                                      path: `./build/postcss.config.js`,
                                  },
                              },
                          },
                          {
                              loader: 'sass-loader',
                          },
                          {
                              loader: 'sass-resources-loader',
                              options: {
                                  resources: scssResources,
                              },
                          },
                      ]
                    : [
                          'vue-style-loader',
                          'css-loader',
                          'sass-loader',
                          {
                              loader: 'sass-resources-loader',
                              options: {
                                  resources: scssResources,
                              },
                          },
                      ],
            },
            {
                test: /\.pug$/,
                oneOf: [
                    {
                        resourceQuery: /^\?vue/,
                        use: [
                            {
                                loader: 'pug-bem-plain-loader',
                                options: {
                                    b: true, // default 'b-'
                                    e: '__',
                                    m: '--',
                                },
                            },
                        ],
                    },

                    {
                        use: ['raw-loader', 'pug-bem-plain-loader'],
                    },
                ],
            },
        ],
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false,
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true,
                },
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vueGroup: {
                    test: /[\\/]node_modules[\\/](vue|es6-promise)[\\/]/,
                    chunks: 'all',
                },
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                },
            },
        },
    },
    plugins,
}

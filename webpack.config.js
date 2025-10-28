const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './assets/js/main.js',
        router: './assets/js/router.js',
        template: './assets/js/template.js',
        formValidator: './assets/js/form-validator.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: 'assets/img', 
                    to: 'assets/img' 
                }
            ]
        }),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        ['mozjpeg', { quality: 75 }],
                        ['pngquant', { quality: [0.65, 0.9], speed: 4 }],
                        ['gifsicle', { interlaced: true }],
                        ['svgo', {}]
                    ]
                }
            }
        }),
        new ImageminWebpWebpackPlugin({
            config: [{
                test: /\.(jpe?g|png)/,
                options: {
                    quality: 75
                }
            }],
            overrideExtension: true,
            detailedLogs: true,
            silent: false,
            strict: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};
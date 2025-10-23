const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('imagemin-webpack-plugin').default;

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
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: ['gifsicle', 'jpegtran', 'optipng', 'svgo']
            }
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
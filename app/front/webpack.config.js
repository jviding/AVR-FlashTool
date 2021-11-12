const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: [
        path.resolve(__dirname, './app/main.tsx'),
        path.resolve(__dirname, './app/style.scss')
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] 
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'app.css'
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx']
        })
    ],
    output: {
        path: path.resolve(__dirname, './static/'),
        filename: 'app.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        allowedHosts: ['*'],
        port: 8080,
        static: {
            directory: './static/',
            publicPath: '/'
        }
    }
}
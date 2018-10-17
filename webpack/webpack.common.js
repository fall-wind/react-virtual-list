const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            title: 'react-virtual-list',
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            inject: 'body',
            chunksSortMode: 'none',
        }),
    ],
    output: {
        chunkFilename: '[id][hash].js', // 按需加载名称
        filename: 'app.[hash].js', // 出口文件名称
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {},
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?minimize',
                ],
            },
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    'css-loader?minimize',
                    'less-loader',
                ],
            },
            {
                test: /\.styl/,
                // include: config.srcPath,
                use: [
                    'style-loader',
                    'css-loader?minimize',
                    'stylus-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|woff|woff2)$/,
                include: config.srcPath,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
                exclude: /node_modules/,
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                include: config.srcPath,
                loader: 'file-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: {},
};

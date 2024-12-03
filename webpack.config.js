const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: isDevelopment ? {
        static: './dist',
        hot: true,
    } : undefined,
    devtool: isDevelopment ? 'inline-source-map' : undefined,
    mode: isDevelopment ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], 
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './index.html',
          favicon: './favicon.ico'
        }),
    ],
};
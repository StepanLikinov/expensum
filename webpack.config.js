const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    watch: !isDevelopment,
    devServer: isDevelopment ? {
        static: './dist',
        hot: true,
    } : undefined,
    devtool: isDevelopment ? 'inline-source-map' : undefined,
    mode: isDevelopment ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader',],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico'
        }),
    ],
};
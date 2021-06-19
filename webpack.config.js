const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: 'development',
    // Entry files
    entry: {
        polyfill: "babel-polyfill",
        app: "./javascript/app.js",
    },
    // Live server settings
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    // Rules for for loaders
    module: {
        rules: [
            // Rules for babel
            {
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
                test: /\.js$/,
            },
            // Rules for styles
            {
                test: /\.(scss|css|sass)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            // Rules for images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // Rules for fonts and svg
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            
        ],
    },
    // Plugins
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html",
        }),
    ],
    // Result file
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    }
}
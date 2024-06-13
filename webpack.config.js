const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.mjs',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/styles.css', to: 'styles.css' },
                { from: 'src/assets', to: 'assets' } // Ensure assets are copied to 'dist/assets'
            ]
        })
    ],
    resolve: {
        alias: {
            three: path.resolve(__dirname, 'node_modules/three')
        },
        fallback: {
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "stream": require.resolve("stream-browserify"),
            "https": require.resolve("https-browserify"),
            "http": require.resolve("stream-http"),
            "crypto": require.resolve("crypto-browserify"),
            "fs": false,
            "vm": require.resolve("vm-browserify"),
            "process": require.resolve("process/browser"),
            "tty": require.resolve("tty-browserify"),
            "util": require.resolve("util"),
            "zlib": require.resolve("browserify-zlib"),
            "assert": require.resolve("assert/"),
            "buffer": require.resolve("buffer/")
        }
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /src/,
                type: "javascript/auto",
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]' // Ensure assets are placed in 'dist/assets'
                }
            },
        ],
    },
    externals: {
        three: 'THREE'
    }
};

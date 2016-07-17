const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/client/index.tsx",

    output: {
        path: "./public",
        filename: "[name].js",
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "React Demo",
        })
    ],

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],
    }
};

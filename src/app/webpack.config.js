const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/client/index.tsx",

    output: {
        filename: "./dist/bundle.js",
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "React Demo",
            filename: "./dist/index.html"
        })
    ],

    devtool: "source-map",

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    /*externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },*/
};
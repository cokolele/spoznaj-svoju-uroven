const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    name: "dev",
    context: __dirname,
    entry: [
        "webpack-dev-server/client?http://0.0.0.0:80",
        "webpack/hot/only-dev-server",
        "./src/index.jsx"
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.[name].js",
        assetModuleFilename: "asset.[id][ext]",
        chunkFilename: "[id].[chunkhash].js"
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src"),
        }
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "app.vendor",
                    chunks: "all",
                },
            },
        },
    },
    mode: "development",
    target: "browserslist:last 2 versions",
    plugins: [
        new MiniCssExtractPlugin({
            filename: "app.[name].css"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: false,
            inject: "body",
            publicPath: "/"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin({
            include: /\.jsx$/,
        }),
        new BundleAnalyzerPlugin()
    ],
    devtool: "eval-cheap-source-map",
    devServer: {
        hot: true,
        contentBase: "./src/",
        compress: true,
        port: 80,
        host: "0.0.0.0",
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "http://api.programator.sk",
                pathRewrite: { "^/api": "" },
                secure: false,
                changeOrigin: true
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                type: "asset/resource"
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            "react-refresh/babel"
                        ]
                    }
                }
            },
            {
                test: /\.(js|mjs|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-react", {
                                development: true,
                                runtime: "automatic"
                            }]
                        ]
                    }
                }
            }
        ]
    }
};

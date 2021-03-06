const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    name: "prod",
    context: __dirname,
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "./[name].[contenthash:8].js",
        assetModuleFilename: "asset.[contenthash:8][ext]",
        clean: true
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src"),
        }
    },
    mode: "development",
    target: "web",
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "app.[contenthash:8].css"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: false,
            inject: "body"
        }),
        new BundleAnalyzerPlugin({
            statsOptions: { all: true }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require("autoprefixer")
                                ]
                            }
                        }
                    },
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|jpg|jpeg)/,
                type: "asset/resource"
            },
            {
                test: /\.(js|mjs|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-react", {
                                development: false,
                                runtime: "automatic"
                            }],
                            ["@babel/preset-env", {
                                targets: [
                                    ">0.2%",
                                    "not dead",
                                    "not op_mini all"
                                ],
                                bugfixes: true,
                                useBuiltIns: "usage",
                                corejs: "3.9",
                            }]
                        ]
                    }
                }
            }
        ]
    }
};

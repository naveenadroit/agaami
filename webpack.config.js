const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const fs = require("fs");
const webpack = require('webpack');

const pages = fs
  .readdirSync(path.resolve(__dirname, "./src/"))
  .filter(fileName => fileName.endsWith(".pug"));

module.exports = {
  entry: {
    main: ["@babel/polyfill","./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: [/images/],
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./assets/fonts/"
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: [/fonts/],
        use: {
          loader: "file-loader",
          options: {
            outputPath: "./assets/images/",
            name: "[name].[ext]"
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.pug$/,
        use: ['html-loader?interpolate', 'pug-html-loader?pretty=true']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("dist", {}),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    }),

    ...pages.map(
      page =>
        new HtmlWebpackPlugin({
          // inject: false,
          hash: true,
          template: "./src/" + page,
          filename: page.slice(0, -3) + "html"
        })
    ),
    new WebpackMd5Hash(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
  ],
  "devtool" : "none"
};

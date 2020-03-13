const path = require("path");
const { DefinePlugin, HotModuleReplacementPlugin, NormalModuleReplacementPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

require("dotenv").config({ path: path.join(__dirname, "/.env") });

module.exports = {
  entry: "./src/index.js",
  devtool: process.env.NODE_ENV === "development" ? "eval-source-map" : false,
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "chat.bundle.js",
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use:
          process.env.NODE_ENV === "development"
            ? [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
            : [
                MiniCssExtractPlugin.loader,
                "css-loader",
                {
                  loader: "@americanexpress/purgecss-loader",
                  options: {
                    paths: [path.join(__dirname, "src/**/*.{js,jsx}")],
                  },
                },
                "postcss-loader",
              ],
      },
    ],
  },
  plugins:
    process.env.NODE_ENV === "development"
      ? [
          new CopyPlugin([{ from: "public" }]),
          new DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env.API_SERVER_URL": JSON.stringify(process.env.API_SERVER_URL),
            "process.env.CSS_PREFIX": JSON.stringify(process.env.CSS_PREFIX),
          }),
          new MiniCssExtractPlugin({
            filename: "chat.bundle.css",
          }),
          new HotModuleReplacementPlugin(),
        ]
      : [
          new CleanWebpackPlugin(),
          new CopyPlugin([{ from: "public" }]),
          new NormalModuleReplacementPlugin(/debug/, path.join(__dirname, "/src/lib/noop.js")),
          new DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env.API_SERVER_URL": JSON.stringify(process.env.API_SERVER_URL),
            "process.env.CSS_PREFIX": JSON.stringify(process.env.CSS_PREFIX),
          }),
          new MiniCssExtractPlugin({
            filename: "chat.bundle.css",
          }),
        ],
  devServer:
    process.env.NODE_ENV === "development"
      ? {
          contentBase: "./dist",
          hot: true,
          writeToDisk: true,
        }
      : {
          hot: false,
        },
  optimization:
    process.env.NODE_ENV === "development"
      ? {
          minimize: false,
        }
      : {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              cache: true,
              parallel: true,
              sourceMap: false,
              extractComments: false,
              terserOptions: {
                ecma: 5,
                compress: {
                  drop_console: true,
                },
                output: {
                  comments: false,
                },
                nameCache: {},
              },
            }),
          ],
        },
};

if (process.env.ANALYZE) module.exports.plugins.push(new BundleAnalyzerPlugin());

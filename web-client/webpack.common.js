const path = require("path");
const { DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyPlugin = require("copy-webpack-plugin");

require("dotenv").config({ path: path.join(__dirname, "/.env") });

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js",
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
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
        use: [
          "style-loader",
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
  plugins: [
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_SERVER_URL": JSON.stringify(process.env.API_SERVER_URL),
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: "public" }]),
  ],
};

if (process.env.ANALYZE) module.exports.plugins.push(new BundleAnalyzerPlugin());

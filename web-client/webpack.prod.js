const path = require("path");
const merge = require("webpack-merge");
const { NormalModuleReplacementPlugin } = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  plugins: [new NormalModuleReplacementPlugin(/debug/, path.join(__dirname, "/src/lib/noop.js"))],
  optimization: {
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
});

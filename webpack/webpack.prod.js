const { merge } = require("webpack-merge");

const { baseWebpackConfig } = require("./webpack.base.js");

const webpackConfig = merge(baseWebpackConfig("production"), {
  stats: { children: false }, // MiniCssExtractPlugin spam..
  devtool: false,
  optimization: {
    minimize: true,
  },
});

module.exports = webpackConfig;

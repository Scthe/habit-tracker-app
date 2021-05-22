const { merge } = require("webpack-merge");

const { baseWebpackConfig } = require("./webpack.base.js");

const webpackConfig = merge(baseWebpackConfig("production"), {
  mode: "production",
  stats: { children: false }, // MiniCssExtractPlugin spam..
  devtool: "source-map",
  optimization: {
    minimize: true,
    // chunkIds: "named", // for debugging file content
  },
});

module.exports = webpackConfig;

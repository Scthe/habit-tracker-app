const webpack = require("webpack");
const { merge } = require("webpack-merge");

const { baseWebpackConfig, ROOT, DESTINATION } = require("./webpack.base.js");

const webpackConfig = merge(baseWebpackConfig("development"), {
  stats: "minimal",
  devtool: "cheap-module-source-map",
  // https://stackoverflow.com/questions/65034496/how-can-i-get-hot-reloading-hmr-running-with-webpack-5
  devServer: {
    hot: true,
    liveReload: true,
    static: ROOT,
    // webpack v4:
    // disableHostCheck: true, // TODO remove me https://github.com/webpack/webpack-dev-server/issues/1604
    // stats: "minimal",
    // contentBase: DESTINATION,
  },
});

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = webpackConfig;

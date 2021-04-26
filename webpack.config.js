const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const ReactRefreshTypeScript = require('react-refresh-typescript');

const ROOT = path.resolve(__dirname, "src");
const DESTINATION = path.resolve(__dirname, "dist");

const config = ({ mode, isProd }) => ({
  mode,
  context: ROOT,
  entry: {
    main: "./index.tsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: DESTINATION,
  },
  performance: {
    maxEntrypointSize: 300 * 1024, // 250kb
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [ROOT, "node_modules"],
    alias: {}, // typescript aliases are in tsconfig.json
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      /*{
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              getCustomTransformers: () => ({
                before: isProd ? [] : [ReactRefreshTypeScript()],
              }),
            },
          },
        ],
      },*/
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // loader: 'url-loader?limit=100000'
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        include: [ROOT, /@fontsource/g], // we import fonts from npm packages too, e.g. `@fontsource`
        use: [
          MiniCssExtractPlugin.loader, // extracts to file
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(mode), // just in case
      DEBUG: JSON.stringify(!isProd),
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      // create HTML file as part of webpack output. Also injects all chunks
      template: "index.html",
      sourceMap: false,
      favicon: "./favicon.ico",
    }),
  ],
});

const configProd = (config) => {
  config.plugins.unshift(
    new CleanWebpackPlugin()
  );
  config.stats = { children: false }; // MiniCssExtractPlugin spam..
  config.optimization = {
    minimize: true,
  };
  return config;
};

const configDev = (config) => {
  // https://stackoverflow.com/questions/65034496/how-can-i-get-hot-reloading-hmr-running-with-webpack-5
  config.devServer = {
    hot: true,
    liveReload: true,
    static: ROOT,
    // disableHostCheck: true, // TODO remove me https://github.com/webpack/webpack-dev-server/issues/1604
    // stats: "minimal",
    // contentBase: DESTINATION,
    // overlay: { warnings: true, errors: true }, // nope in dev-server this is in client
  };
  config.stats = "minimal";
  config.devtool = "cheap-module-source-map";
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  // config.plugins.push(new ReactRefreshWebpackPlugin());
  return config;
};

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  const opts = { mode: isProd ? "production" : "development", isProd };
  // console.log("MODE:", JSON.stringify(opts));

  const cfg = config(opts);

  return opts.isProd ? configProd(cfg) : configDev(cfg);
};

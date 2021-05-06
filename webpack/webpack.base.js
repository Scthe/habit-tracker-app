const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const ROOT = path.resolve(__dirname, "..", "src");
const DESTINATION = path.resolve(__dirname, "..", "dist");

const HTML_PLUGIN_OPTS = {
  sourceMap: false,
  favicon: "./favicon.ico",
};
const HTML_PLUGIN_STATIC_OPTS = {
  inject: "head", // should be empty, used just as entry point
  scriptLoading: "blocking",
};

const isProd = (mode) => mode === "production";
const createFilename = (mode, ext) =>
  isProd(mode) ? `[name].[contenthash].${ext}` : `[name].${ext}`;

const baseWebpackConfig = (mode) => ({
  mode,
  context: ROOT,
  entry: {
    app: "./index.tsx",
    login: "./pages/_login/index.ts",
    index: "./pages/_landingPage/index.ts",
  },
  output: {
    filename: createFilename(mode, "js"),
    path: DESTINATION,
    assetModuleFilename: "images/[hash][ext][query]",
  },
  performance: {
    maxEntrypointSize: 250 * 1024, // 250kb
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [ROOT, "node_modules"],
    alias: {}, // typescript aliases are in tsconfig.json
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: "asset/resource",
        generator: {
          filename: "static/[hash][ext][query]",
        },
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
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: createFilename(mode, "css"),
    }),
    new HtmlWebpackPlugin({
      ...HTML_PLUGIN_OPTS,
      template: "app.html",
      filename: "app/index.html",
      chunks: ["app"],
    }),
    new HtmlWebpackPlugin({
      ...HTML_PLUGIN_OPTS,
      ...HTML_PLUGIN_STATIC_OPTS,
      template: "pages/_landingPage/landingPage.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      ...HTML_PLUGIN_OPTS,
      ...HTML_PLUGIN_STATIC_OPTS,
      template: "pages/_login/login.html",
      filename: "login/index.html",
      chunks: ["login"],
    }),
  ],
});

module.exports = { baseWebpackConfig, ROOT, DESTINATION };
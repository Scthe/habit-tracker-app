module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-global-import"),
    require("precss"),
    require("postcss-normalize"),
    require("autoprefixer"),
    [
      "postcss-url",
      // { filter: '**/assets/copy/*.png', url: 'copy', assetsPath: 'img', useHash: true },
      // { filter: '**/fontsource/*', url: 'copy', assetsPath: 'fonts' },
      // { url: "inline" }
      { url: "rebase" },
    ],
  ],
};

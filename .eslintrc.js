module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "react-hooks/exhaustive-deps": "error",
  }
};

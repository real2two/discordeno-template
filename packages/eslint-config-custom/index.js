module.exports = {
  extends: ["turbo", "prettier"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",

    requireConfigFile: false,
  },
};

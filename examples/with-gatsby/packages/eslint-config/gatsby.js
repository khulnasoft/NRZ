const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use in an application
 * that utilizes Gatsby.
 *
 * This config extends the Khulnasoft Engineering Style Guide.
 * For more information, see https://github.com/khulnasoft/style-guide
 *
 */

module.exports = {
  extends: [
    "@khulnasoft/style-guide/eslint/browser",
    "@khulnasoft/style-guide/eslint/typescript",
    "@khulnasoft/style-guide/eslint/react",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "**/*.css"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
  },
};

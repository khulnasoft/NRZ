const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use a library
 * that utilizes React.
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
  env: {
    browser: true,
    node: true,
  },
  plugins: ["only-warn"],
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

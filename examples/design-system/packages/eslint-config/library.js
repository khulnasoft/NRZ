const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 * This config extends the Khulnasoft Engineering Style Guide.
 * For more information, see https://github.com/khulnasoft/style-guide
 *
 */

module.exports = {
  extends: [
    "@khulnasoft/style-guide/eslint/node",
    "@khulnasoft/style-guide/eslint/typescript",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  plugins: ["only-warn"],
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
};

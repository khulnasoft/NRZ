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
    "plugin:storybook/recommended",
    "plugin:mdx/recommended",
    ...[
      "@khulnasoft/style-guide/eslint/node",
      "@khulnasoft/style-guide/eslint/typescript",
      "@khulnasoft/style-guide/eslint/browser",
      "@khulnasoft/style-guide/eslint/react",
    ].map(require.resolve),
  ],
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
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
  },
};

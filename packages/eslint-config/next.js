const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "@khulnasoft/style-guide/eslint/node",
    "@khulnasoft/style-guide/eslint/typescript",
    "@khulnasoft/style-guide/eslint/browser",
    "@khulnasoft/style-guide/eslint/react",
    "@khulnasoft/style-guide/eslint/next",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  rules: {
    "unicorn/filename-case": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
  },
};

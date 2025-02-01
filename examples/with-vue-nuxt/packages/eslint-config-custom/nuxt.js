const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * NuxtJs apps.
 *
 * This config extends the Khulnasoft Engineering Style Guide.
 * For more information, see https://github.com/khulnasoft/style-guide
 *
 */
module.exports = {
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "@khulnasoft/style-guide/eslint/node",
    "@khulnasoft/style-guide/eslint/browser",
    "nrz",
  ].map(require.resolve),
  parserOptions: {
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/", ".eslintrc.cjs", "nuxt.config.ts"],
  rules: {
    "comma-dangle": "off",
    semi: "off",
    "no-undef": "off",
    // add specific rules configurations here
  },
};

import globals from "globals";
import prettier from "eslint-config-prettier";
import js from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      // to make it aware of browser and node globals
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          // this makes the linter understand react better
          jsx: true,
        },
      },
    },
  },
  prettier,
];

// we are export the rules for the linter

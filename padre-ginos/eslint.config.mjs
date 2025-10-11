import globals from "globals";
import prettier from "eslint-config-prettier";
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        // to make it able to detect the current react version we are working with
        version: "detect",
      },
    },
  },
  // fixing the error around not importing react
  reactPlugin.configs.flat["jsx-runtime"],
  {
    files: ["**/*.js", "**/*.jsx"],
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
    rules: {
      "react/no-unescaped-entities": "off", // so we can write ' not forcing to &apos
      "react/prop-types": "off",
    },
  },
  prettier,
];

// we are export the rules for the linter

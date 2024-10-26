import js from "@eslint/js";
import globals from "globals";
import tsLint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default tsLint.config(
  {
    plugins: {
      "@typescript-eslint": tsLint.plugin,
      prettier: prettierPlugin,
    },
  },
  {
    ignores: ["node_modules", "dist", "**.*js"],
  },
  js.configs.recommended,
  ...tsLint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        project: ["tsconfig.json"],
      },
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      ...eslintConfigPrettier.rules,
      "prefer-const": "error",
      curly: "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-useless-escape": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-this-alias": "off",
    },
  },
);

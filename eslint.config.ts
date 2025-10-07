import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";
import reactPlugin from "eslint-plugin-react";

export default [
  ...pluginQuery.configs["flat/recommended"],
  ...pluginRouter.configs["flat/recommended"],
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // That doesn't make sense anymore since React 18
      "react/jsx-key": "error",
      "no-undef": "off", // Typescript already does it
      "no-unused-vars": "off", // We're using the typescript rules, otherwise there are false positive
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "react-hooks/exhaustive-deps": "error",
    },
  },
];

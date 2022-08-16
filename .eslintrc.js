module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "standard-with-typescript",
    // "airbnb-base",
    // 型を必要としないプラグインの推奨ルールをすべて有効
    "plugin:@typescript-eslint/recommended",
    // 型を必要とするプラグインの推奨ルールをすべて有効
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    // 他の設定の上書きを行うために、必ず最後に配置する。
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // ecmaVersion: 12,
    // sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "newline-before-return": "error",
    "no-console": "warn",
    "no-var": "error",
  },
};

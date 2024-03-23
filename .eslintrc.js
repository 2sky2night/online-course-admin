module.exports = {
  extends: [require.resolve("@umijs/lint/dist/config/eslint")],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
};

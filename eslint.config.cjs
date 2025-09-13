// eslint.config.cjs
const vue = require("eslint-plugin-vue");

module.exports = [
  ...vue.configs["flat/recommended"], // ✅ lo expande en lugar de meter el array crudo
  {
    files: ["**/*.js", "**/*.vue"],
    languageOptions: {
      parser: require("vue-eslint-parser"),
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    plugins: {
      vue,
    },
    rules: {
      "no-console": "off",
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/html-self-closing": "off"
    },
  },
];

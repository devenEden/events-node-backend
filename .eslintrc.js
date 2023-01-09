module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    "constructor-super": 2,
    "for-direction": 2,
    "getter-return": 2,
    "no-async-promise-executor": 2,
    "no-case-declarations": 2,
    "no-class-assign": 2,
    "no-compare-neg-zero": 2,
    "no-cond-assign": 2,
    "no-const-assign": 2,
    "no-constant-condition": 2,
    "no-control-regex": 2,
    "no-debugger": 2,
    "no-delete-var": 2,
    "no-dupe-args": 2,
    "no-dupe-class-members": 2,
    "no-dupe-else-if": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty": 2,
    "no-empty-character-class": 2,
    "no-empty-pattern": 2,
    "no-ex-assign": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-semi": 2,
    "no-fallthrough": 2,
    "no-func-assign": 2,
    "no-global-assign": 2,
    "no-import-assign": 2,
    "no-inner-declarations": 2,
    "no-invalid-regexp": 2,
    "no-irregular-whitespace": 2,
    "no-misleading-character-class": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-new-symbol": 2,
    "no-obj-calls": 2,
    "no-octal": 2,
    "no-prototype-builtins": 2,
    "no-redeclare": 2,
    "no-regex-spaces": 2,
    "no-self-assign": 2,
    "no-setter-return": 2,
    "no-shadow-restricted-names": 2,
    "no-sparse-arrays": 2,
    "no-tabs": ["error", { allowIndentationTabs: true }],
    "no-this-before-super": 2,
    "no-undef": 2,
    "no-underscore-dangle": ["error", { allow: ["__dirname", "__basedir"] }],
    "no-unexpected-multiline": 2,
    "no-unreachable": 2,
    "no-unsafe-finally": 2,
    "no-unsafe-negation": 2,
    "no-unused-labels": 2,
    "no-unused-vars": "warn",
    "no-useless-catch": 2,
    "no-useless-escape": 2,
    "no-with": 2,
    "require-yield": 2,
    "use-isnan": 2,
    "valid-typeof": 2,
    "no-console": 2,
    "no-alert": 2,
    "newline-before-return": 2,
    "newline-after-var": 2,
    "require-await": 2,
    "no-multi-assign": 2,
    "no-multi-spaces": 2,
    radix: 2,
    "func-style": 2,
    indent: [2, 2, { SwitchCase: 1 }],
    "key-spacing": 2,
    "line-comment-position": 2,
    "default-case": 2,
    "no-unreachable-loop": 2,
    "no-trailing-spaces": 2,
    "no-use-before-define": 2,
    "no-var": 2,
    "spaced-comment": 2,
    "switch-colon-spacing": 2,
    "prefer-destructuring": ["error", { object: true, array: false }],
    "no-unused-expressions": 2,
    "no-duplicate-imports": 2,
    "global-require": 2,
    "dot-notation": 2,
    "comma-spacing": 2,
  },
};

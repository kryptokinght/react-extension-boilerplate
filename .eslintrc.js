module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  rules: {
    "no-console": "off",
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "no-continue": "off",
    "camelcase": "off",
    "no-empty": "off",
    "no-param-reassign": "off",
    "func-names": [
      "error",
      "never"
    ],
    "prefer-destructuring": [
      "error",
      {
        "object": false,
        "array": false
      }
    ],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'always'],
    'react/jsx-uses-vars': 1,
    'react/jsx-uses-react': 1,
    'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }],
  },
};
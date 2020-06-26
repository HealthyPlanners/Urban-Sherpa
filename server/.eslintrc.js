module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2020: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'prettier/prettier': 2,
  },
};

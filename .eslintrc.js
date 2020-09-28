module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: [],
}

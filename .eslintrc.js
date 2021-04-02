module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    createDefaultProgram: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['@react-native-community', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
  overrides: [
    // {
    //   files: ['packages/**'],
    //   rules: {
    //     '@typescript-eslint/explicit-function-return-type': ['warn'],
    //     '@typescript-eslint/explicit-member-accessibility': ['warn'],
    //     '@typescript-eslint/explicit-module-boundary-types': ['off'],
    //     '@typescript-eslint/no-unnecessary-condition': ['warn'],
    //   },
    // },
    // {
    //   files: ['./packages/homehealth-common-feature/src/sagas/*.ts'],
    //   rules: {
    //     '@typescript-eslint/explicit-function-return-type': 'off',
    //     '@typescript-eslint/explicit-module-boundary-types': 'off',
    //     '@typescript-eslint/no-empty-function': 'off',
    //   },
    // },
  ],
};

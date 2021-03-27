const { defaults: tsjPreset } = require('ts-jest/presets');
const package = require(process.cwd() + '/package');

if (package.name !== 'homehealth-features') {
    process.chdir('../../')
}

module.exports = {
  ...tsjPreset,
  rootDir: process.cwd(),
  preset: 'react-native',
  cacheDirectory: '.jest/cache',
  coverageDirectory: 'jest/coverage',
  transformIgnorePatterns: [
    'node_modules/(?!(react)/)',
    'storybook/',
  ],
  collectCoverageFrom: [
      '<rootDir>/packages/homehealth-*-*/src/**/*.{js,jsx,ts,tsx}',
      '!<rootDir>/packages/homehealth-*-*/src/**/index.{js,jsx,ts,tsx}',
      '!<rootDir>/packages/homehealth-*-*/dist/'
  ],
  transform: {
    ...tsjPreset.transform,
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/packages/example-apps',
    'index.js',
    'index.ts'
  ],
  modulePathIgnorePatterns: [
    'example-apps',
    'index.js',
    'index.ts'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/packages/(?:.+?)/dist/',
    '<rootDir>/packages/(?:.+?)/node_modules/',
    '<rootDir>/packages/example-apps/',
    '<rootDir>/(dist|node_modules)/'
  ],
  coverageThreshold: {
    global: {
      // global thresholds
      branches: 65,
      functions: 60,
      lines: 60,
      statements: 65,
    },
  },
  collectCoverage: true,
  globals: {
    __Dev__: true,
    window: {
      confirm: {},
    },
    'ts-jest': {
      babelConfig: true,
    },
  },
  timers: 'fake',
  testEnvironment: 'jsdom',
};

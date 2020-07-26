// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  errorOnDeprecated: true,
  notify: true,
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
}

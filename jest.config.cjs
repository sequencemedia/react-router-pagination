module.exports = {
  bail: 1,
  verbose: true,
  rootDir: '.',
  transform: {
    '^.+\\.mts$': 'babel-jest',
    '^.+\\.tsx$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest'
  },
  collectCoverage: true,
  coverageDirectory: './.coverage'
}

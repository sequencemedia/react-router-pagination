export default {
  bail: true,
  verbose: true,
  rootDir: '.',
  roots: [
    './src'
  ],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageProvider: 'v8',
  testRegex: '(/__tests__/.*|(\\.|/))(test|spec)\\.(jsx|mjs|tsx|mts)$',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
    '^.+\\.tsx$': 'babel-jest',
    '^.+\\.mts$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules\\/(?!react-component-instance)\\/',
    '/node_modules\\/(?!react-component-snapshot)\\/',
    '/node_modules\\/(?!react-component-name)\\/'
  ],
  moduleFileExtensions: ['js', 'ts', 'jsx', 'mjs', 'tsx', 'mts'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.mjs'
  ]
}

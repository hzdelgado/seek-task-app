/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/out/',
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'application/**/*.{js,jsx,ts,tsx}', 
    'domain/**/*.{js,jsx,ts,tsx}',
    'infrastructure/**/*.{js,jsx,ts,tsx}'
  ],
};
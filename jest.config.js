/** @type {import('jest').Config} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testRegex: "(test|spec)\\.(ts|tsx)",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    "^~/(.+)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: [
    "<rootDir>/node_modules/@testing-library/jest-dom"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.(tsx|ts)",
    "!src/*.(tsx|ts)",
    "!src/router/*.(tsx|ts)",
    "!src/**/index.(tsx|ts)",
    "!src/**/styles.(tsx|ts)",
    "!src/**/constants.ts",
    "!src/**/context/*.(tsx|ts)",
    "!src/**/*.d.ts",
  ],
  coverageThreshold: {
    "global": {
      "statements": 100,
      "branches": 100,
      "functions": 100,
      "lines": 100
    }
  }
}

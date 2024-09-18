/** @type {import('jest').Config} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^~/(.+)": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.(tsx|ts)",
    "!src/(main|App).(tsx|ts)",
    "!src/router/*.(tsx|ts)",
    "!src/**/index.(tsx|ts)",
    "!src/**/styles.(tsx|ts)",
    "!src/**/constants.ts",
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

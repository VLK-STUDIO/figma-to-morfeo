/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: ["widget-src/**/*.ts"],
  setupFiles: ["<rootDir>/__mocks__/figmaMock.js"],
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
/** @type {import('./test-environment/figma')} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "./test-environment/figma",
  collectCoverageFrom: ["widget-src/**/*.ts"],
};

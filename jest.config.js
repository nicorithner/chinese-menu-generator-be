/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = async () => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
  };
};

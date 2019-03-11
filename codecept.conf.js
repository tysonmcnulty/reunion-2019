const TEST_PORT = process.env["TEST_PORT"] || "2004";

exports.config = {
  tests: "./acceptance/*-test.js",
  output: "./acceptance/output",
  helpers: {
    Puppeteer: {
      url: `http://localhost:${TEST_PORT}`
    }
  },
  include: {
    I: "./acceptance/steps.js"
  },
  bootstrap: null,
  mocha: {},
  name: "reunion-2019"
};

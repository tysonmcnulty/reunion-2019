exports.config = {
  tests: './acceptance/*-test.js',
  output: './acceptance/output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:2004'
    }
  },
  include: {
    I: './acceptance/steps.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'reunion-2019'
}
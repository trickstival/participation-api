const dotenv = require('dotenv')

dotenv.config({
  path: '.env.test'
})

module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
}

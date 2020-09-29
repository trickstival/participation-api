const winston = require('winston')
const { state } = require('./state')

const log = winston.createLogger()

function startLogger () {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  const consoleOutput = new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  })
  log.add(consoleOutput)
}

function logHttpRequests () {
  state.app.use((req, res, next) => {
    log.debug(`${req.method} ${req.url}`)
    next()
  })
}

module.exports.log = log
module.exports.startLogging = () => {
  startLogger()
  logHttpRequests()
}

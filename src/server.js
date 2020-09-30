const express = require('express')
const cors = require('cors')
const { log, startLogging } = require('./logging')
const { state } = require('./state')
const startModels = require('./models')
const startControllers = require('./controllers')

let app

function createApp () {
    app = state.app = express()
    app.use(express.json())
    app.use(cors({
      origin: process.env.ALLOWED_ORIGIN
    }))
    startLogging(app)
    catchHttpErrors()
    startModels()
    startControllers()
}

function catchHttpErrors () {
  app.use((err, req, res, next) => {
    log.error(err.stack)
    res.status(500).send('Something went wrong')
  })
}

function startApp () {
  app.listen(process.env.API_PORT, () => {
    log.info('Started server at ' + process.env.API_PORT)
  })
}

module.exports = {
  startApp,
  createApp
}

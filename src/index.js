const express = require('express')
const dotenv = require('dotenv')
const { log, startLogging } = require('./logging')
const { state } = require('./state')

dotenv.config()

const app = state.app = express()
startApp()

function startApp () {
    startLogging(app)
    catchHttpErrors()

    app.listen(process.env.API_PORT, () => {
      log.info('Started server at ' + process.env.API_PORT)
    })
}

function catchHttpErrors () {
  app.use((err, req, res, next) => {
    log.error(err.stack)
    res.status(500).send('Something went wrong')
  })
}


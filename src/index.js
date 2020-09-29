const express = require('express')
const { log, startLogging } = require('./logging')
const { state } = require('./state')

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
    log.error(err)
    res.status(500).send('Something went wrong')
  })
}


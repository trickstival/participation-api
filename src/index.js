const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { log, startLogging } = require('./logging')
const { state } = require('./state')
const startModels = require('./models')
const startControllers = require('./controllers')

dotenv.config()

const app = state.app = express()
startApp()

function startApp () {
    app.use(express.json())
    app.use(cors({
      origin: process.env.ALLOWED_ORIGIN
    }))
    startLogging(app)
    catchHttpErrors()
    startModels()
    startControllers()

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


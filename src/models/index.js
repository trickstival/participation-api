const { Sequelize } = require('sequelize')
const { log } = require('../logging')
const { state } = require('../state')

module.exports.startModels = () => {
  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    logging: log.debug.bind(log)
  })

  state.models = {
    Participation: require('./participation.model')(sequelize)
  }
}

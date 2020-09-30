const { Sequelize } = require('sequelize')
const { log } = require('../logging')
const { state } = require('../state')

module.exports = () => {
  const sequelize = new Sequelize({
    dialect: 'mysql',
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    logging: log.debug.bind(log)
  })

  state.models = {
    Participation: require('./participation.model')(sequelize)
  }

  if (process.env.NODE_ENV !== 'production') {
    sequelize.sync()
  }
}

const { state } = require('../state')

module.exports = {
  findAll () {
    return state.models.Participation.findAll()
  }
}

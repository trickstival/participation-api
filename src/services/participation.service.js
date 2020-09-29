const { state } = require('../state')

const { Participation } = state.models

module.exports = {
  findAll () {
    return Participation.findAll()
  },
  add (participation) {
    return Participation.create({
      firstName: participation.firstName,
      lastName: participation.lastName,
      participation: participation.participation
    })
  },
  async getCurrentParticipationSum () {
    return Participation.sum('participation')
  }
}

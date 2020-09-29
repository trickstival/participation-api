const { state } = require('../state')
const participationService = require('../services/participation.service')

export default () => {
  const { app } = state
  app.route('/participation')
    .get(async (req, res) => {
      const participations = await participationService.findAll()
      res.send(participations)
    })
}

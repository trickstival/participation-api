const { state } = require('../state')
const participationService = require('../services/participation.service')
const participationValidator = require('../validators/participation.validator')
const { validate } = require('../validators')

module.exports = () => {
  const { app } = state
  app.route('/participation')
    .get(async (req, res, next) => {
      // TODO: automatic error propagation
      try {
        const participations = await participationService.findAll()
        res.send(
          participations.map(p => ({
            firstName: p.firstName,
            lastName: p.lastName,
            id: p.id,
            participation: p.participation
          }))
        )
      } catch (err) {
        next(err)
      }
    })
    .post(async (req, res, next) => {
      try {
        validate(req, res, participationValidator.create)

        const currentSum = await participationService.getCurrentParticipationSum()
        if (currentSum + req.body.participation > 100) {
          return res.status(400).send({
            message: "can't add more than 100% of participation"
          })
        }

        const participation = await participationService.add(req.body)
        res.send({ id: participation.id })
      } catch (err) {
        next(err)
      }
    })
}

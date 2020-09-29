const Joi = require('joi')

module.exports = {
  create: Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(30)
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(30)
      .required(),
    participation: Joi.number()
      .greater(0)
      .less(100)
      .required()
  })
}

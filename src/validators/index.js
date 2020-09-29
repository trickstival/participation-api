module.exports.validate = (req, res, validator) => {
  const validation = validator.validate(req.body)

  if (validation.error) {
    res.status(400).send({
      message: validation.error.message
    })

    throw validation.error
  }
}

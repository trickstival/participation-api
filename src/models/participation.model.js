const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  class Participation extends Model {}
  Participation.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      participation: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: 'Participation'
    }
  )

  return Participation
}

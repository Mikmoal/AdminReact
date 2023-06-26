'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participant.belongsTo(models.Rol, {
        foreignKey: 'id',
        target_key: 'rolId'
      });
      Participant.belongsToMany(models.Junta, {through: models.Participant_Junta})
    }
  }
  Participant.init({
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    rolId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Participant',
    freezeTableName: true
  });
  return Participant;
};
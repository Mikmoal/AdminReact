'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant_Junta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Participant_Junta.init({
    id_participant: DataTypes.INTEGER,
    id_junta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Participant_Junta',
    freezeTableName: true
  });
  return Participant_Junta;
};
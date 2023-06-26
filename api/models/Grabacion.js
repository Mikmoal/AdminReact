'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grabacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Grabacion.belongsTo(models.Junta, {
        foreignKey: 'id',
        target_key: 'id_junta'
      })
    }
  }
  Grabacion.init({
    link: DataTypes.STRING,
    id_junta: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Grabacion',
    freezeTableName: true
  });
  return Grabacion;
};
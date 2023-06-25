'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Junta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Junta.hasMany(models.Grabacion, {
        foreignKey: 'id_junta'
      })
    }
  }
  Junta.init({
    nombre: DataTypes.STRING,
    integrantes: DataTypes.STRING,
    fecha_ejecucion: DataTypes.DATE,
    hora_inicio: DataTypes.TIME,
    hora_fin: DataTypes.TIME,
    periodicidad: DataTypes.STRING,
    sala_juntas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Junta',
  });
  return Junta;
};
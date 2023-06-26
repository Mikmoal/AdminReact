'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Junta, {
        foreignKey: 'id',
        target_key: 'id_junta'
      });
      Task.hasMany(models.Evidence, {
        foreignKey: 'id_task',
      })
    }
  }
  Task.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fecha_entrega: DataTypes.DATE,
    status: DataTypes.STRING,
    id_junta: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Task',
    freezeTableName: true
  });
  return Task;
};
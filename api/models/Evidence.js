'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evidence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Evidence.belongsTo(models.Task, {
        foreignKey: 'id',
        target_key: 'id_task'
      });
    }
  }
  Evidence.init({
    link: DataTypes.STRING,
    id_task: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Evidence',
    freezeTableName: true
  });
  return Evidence;
};
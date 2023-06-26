'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Junta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      integrantes: {
        type: Sequelize.STRING
      },
      fecha_ejecucion: {
        type: Sequelize.DATE
      },
      hora_inicio: {
        type: Sequelize.TIME
      },
      hora_fin: {
        type: Sequelize.TIME
      },
      periodicidad: {
        type: Sequelize.STRING
      },
      sala_juntas: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      freezeTableName: true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Junta');
  }
};
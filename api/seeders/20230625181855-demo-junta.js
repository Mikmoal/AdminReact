'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
      Example: **/
      
     await queryInterface.bulkInsert('Junta', [{
      nombre: 'John',
      integrantes: 'Doe',
      fecha_ejecucion: new Date(),
      hora_inicio: "12:30:59",
      hora_fin: "12:31:01",
      periodicidad: "una vez",
      sala_juntas: "Mace",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

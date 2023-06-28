'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
      Example: **/
      
     await queryInterface.bulkInsert('Rol', [
      {tipo: 'usuario'},
      {tipo: 'administrador'},
      {tipo: 'directivo'}
    ]);
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Rol', [
      {tipo: 'usuario'},
      {tipo: 'administrador'},
      {tipo: 'directivo'}
    ], {});
  }
};

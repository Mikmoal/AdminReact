'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
      Example: **/
      
     await queryInterface.bulkInsert('Participant', [
      {
        nombre: 'Miguel Morales',
        email: 'miguel.morales@racingcargo.com',
        rolId: 2
      },
      {
        nombre: 'Jorge Juárez',
        email: 'jorge.juarez@racingcargo.com',
        rolId: 3
      },
      {
        nombre: 'Marcela Gonzalez',
        email: 'marcela.gonzalez@racingcargo.com',
        rolId: 3
      }
    ]);
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Rol', null, {});
  }
};

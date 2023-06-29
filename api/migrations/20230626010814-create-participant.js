'use strict';

// const fs = require('fs');
// const path = "C:/Users/migue/OneDrive/Documents/BackUps/UsersRC.json"
// const jsonData = fs.readFileSync(path, 'utf8');
// const data = JSON.parse(jsonData);

// const dataClean = data.map(el => {
//   el.users.forEach(ele => {

//     return {
//       nombre: ele['First Name [Required]'],
//       apellido: ele['Last Name [Required]'],
//       email: ele['Email Address [Required]']
//     }
//   })
// })

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Participant', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      rolId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Rol',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    },
    {
      freezeTableName: true
    });
    // await queryInterface.bulkInsert('Participant',data);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Participant');
  }
};
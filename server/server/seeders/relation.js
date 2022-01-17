'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('relations', [
      {
        id: 'Supplier',
        code: '1',
        description: 'From who you buy equipment or services',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Purchaser',
        code: '2',
        description: 'Who uses your equipment or services',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Partner',
        code: '3',
        description: 'With who you buy and sell equipment or services',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Staff',
        code: '4',
        description: 'Company Staff',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('relation', null, {});
  }
};
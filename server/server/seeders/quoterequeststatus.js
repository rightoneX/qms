'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('quoterequeststatuses', [
      {
        id: 'Editing',
        description: 'Editing is in progress',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Emailed',
        description: 'Quote had been emailed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Awaiting',
        description: 'Awaiting respons from the client',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Following',
        description: 'Following the quote for respons',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Canceled',
        description: 'The quote had been canceled to this client',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('quoterequeststatuses', null, {});
  }
};
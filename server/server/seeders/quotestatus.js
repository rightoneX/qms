'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('quotestatuses', [
      {
        id: 'Under quoting',
        description: 'The quotation is in still progress',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'On hold',
        description: 'Awaiting additional infromation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Priced',
        description: 'The quotation is completed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Emailed',
        description: 'The quote is emailed to the clients',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Completed',
        description: 'The quotation is completed and emailed to the clients',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'In Progress',
        description: 'The quote is in progress',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('quotestatuses', null, {});
  }
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('currencies', [
      {
        id: 'NZD',
        country: 'New Zealand',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'USD',
        country: 'United State of America',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'AUD',
        country: 'Australia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'EUR',
        country: 'European Union',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'CAD',
        country: 'Canada',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'CNY',
        country: 'China',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'JPY',
        country: 'Japan',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('currencies', null, {});
  }
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stockstatuses', [
      {
        id: 'Stock',
        description: 'The item in the stock',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'Out of stock',
        description: 'All sold out',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'On order',
        description: 'Not in stock, but on order',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'Sold',
        description: 'The product sold to a client',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'Project',
        description: 'Delivered to the site',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'Warranty',
        description: 'The product installed on the seit, on warranty',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'Stock Removal',
        description: 'The product removed from the stock',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'Demonstration',
        description: 'The product taking for a client demonstration',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'Returned',
        description: 'The product had been returned to the stock',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stockstatuses', null, {});
  }
};
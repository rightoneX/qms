'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stockconditions', [
      {
        id: 'New',
        description: 'Brand new equipment in the factory packag',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'Used',
        description: 'Used but in good working condition',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'Refurbished',
        description: 'Refurbished in good working condition',
        createdAt: new Date(),
        updatedAt: new Date()
      },       
      {
        id: 'Uncompleted',
        description: 'Condition is used, but does not have all parts',
        createdAt: new Date(),
        updatedAt: new Date()
      },     
      {
        id: 'Unknown',
        description: 'Secondhand equipment, the condition unknown',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'Faulty',
        description: 'Used faulty equipment, the condition unknown',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'Lost',
        description: 'Unknown location',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 'Removed',
        description: 'Removed from the stock',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stockconditions', null, {});
  }
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sampleposition', [
      {
        position: 'Quantity Surveyor',
        description: 'Quantity Surveyor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile: 'Estimator',
        description: 'Estimator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile: 'Commercial Manager',
        description: 'Commercial Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile: 'Project Manager',
        description: 'Project Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile: 'Director',
        description: 'Director',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile: 'Service Manager',
        description: 'Service Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile: 'General Manager',
        description: 'General Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sampleposition', null, {});
  }
};
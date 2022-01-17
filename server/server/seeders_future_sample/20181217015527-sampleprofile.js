'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sampleprofile', [
      {
        profile: 'Mechanical Services',
        name: 'Mechanical Services',
        description: 'Mechanical Services',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile: 'BMS Integrator',
        name: 'BMS Integrator',
        description: 'BMS Integrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile: 'Mechanical Installer',
        name: 'Mechanical Installer',
        description: 'Mechanical Installer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile: 'Equipment Production',
        name: 'Equipment Production',
        description: 'Equipment Production',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        profile: 'Equipment Manufacturing',
        name: 'Equipment Manufacturing',
        description: 'Equipment Manufacturing',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sampleprofile', null, {});
  }
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sampleproducttypes', [
      {
        profile: 'BMS',
        name: 'Valve',
        description: 'Valve description',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        profile: 'BMS',
        name: 'Valve Actuator',
        description: 'Actuator description',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        profile: 'BMS',
        name: 'Voltage Current',
        description: 'Actuator description',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        profile: 'BMS',
        name: 'Temperature Sensors',
        description: 'Actuator description',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        profile: 'BMS',
        name: 'Humidity Sensor',
        description: 'Actuator description',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        profile: 'BMS',
        name: 'CO2 Sensor',
        description: 'Actuator description',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        profile: 'BMS',
        name: 'Air Flow Pressure',
        description: 'Actuator description',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        profile: 'BMS',
        name: 'Water Flow Senmsor',
        description: 'Actuator description',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        profile: 'BMS',
        name: 'VSD',
        description: 'Variable Speed Driver',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        profile: 'BMS',
        name: 'Pump',
        description: 'Actuator description',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        profile: 'BMS',
        name: 'Fan',
        description: 'Actuator description',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        profile: 'BMS',
        name: 'Damper Actuator',
        description: 'Actuator description',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sampleproduttypes', null, {});
  }
};
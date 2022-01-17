'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permissions', [
      {
        id: 'Super User',
        description: 'Main account of the tenant',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Enable',
        description: 'User account is enalbed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Disable',
        description: 'User account is blocked',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Registration',
        description: 'User is setting up the credentials',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Restriction',
        description: 'Limited access to the site features',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'Suspense',
        description: 'Temporarily blocked user account',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permision', null, {});
  }
};
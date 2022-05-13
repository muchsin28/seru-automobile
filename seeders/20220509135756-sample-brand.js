'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed User
    await queryInterface.bulkInsert('vehicle_brand', [
      {
        name: 'Tesla',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'BMW',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mercedes Benz',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Honda',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Toyota',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mitsubishi',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Aston Martin',
        created_at: new Date(),
        updated_at: new Date()
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vehicle_brand', null, {});
  }
};

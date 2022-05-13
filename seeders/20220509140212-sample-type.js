'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed User
    await queryInterface.bulkInsert('vehicle_type', [
      {
        name: 'Supercar',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Electric',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sedan',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'SUV',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Hacthback',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Coupe',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Crossover',
        created_at: new Date(),
        updated_at: new Date()
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vehicle_type', null, {});
  }
};

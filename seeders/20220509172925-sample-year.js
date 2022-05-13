'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('vehicle_year', [
      {
        year: 2019,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        year: 2020,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        year: 2021,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        year: 2022,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vehicle_year', null, {})
  }
}

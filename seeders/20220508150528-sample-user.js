'use strict'
const { hashPassword } = require('../helpers')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed User
    await queryInterface.bulkInsert('users', [
      {
        name: 'Tony Stark',
        email: 'tony@avenger.com',
        password: await hashPassword('ironman'),
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Steve Roger',
        email: 'steve@avenger.com',
        password: await hashPassword('captainamerica'),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date()
      }

    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}

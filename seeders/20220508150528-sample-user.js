'use strict';
const {randomUUID} = require('crypto');
const {hashPassword} = require('../helper')


module.exports = {
  up: async (queryInterface, Sequelize) => {
   //Seed User
    await queryInterface.bulkInsert('users', [
      {
        id:randomUUID(),
        name: 'Tony Stark',
        email: 'tony@avenger.com',
        password: await hashPassword("friday!"),
        is_admin:true,
        created_at:new Date(),
        updated_at:new Date()
      },
      {
        id:randomUUID(),
        name: 'Steve Roger',
        email: 'steve@avenger.com',
        password: await hashPassword("ontheleft"),
        is_admin:false,
        created_at:new Date(),
        updated_at:new Date()
      },

    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

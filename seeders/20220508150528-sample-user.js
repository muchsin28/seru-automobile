'use strict';
const {hashPassword} = require('../helpers')


module.exports = {
  up: async (queryInterface, Sequelize) => {
   //Seed User
    await queryInterface.bulkInsert('users', [
      {
        name: 'Tony Stark',
        email: 'tony@avenger.com',
        password: await hashPassword("friday!"),
        is_admin:true,
        created_at:new Date(),
        updated_at:new Date()
      },
      {
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
    await queryInterface.bulkDelete('users', null, {});
  }
};

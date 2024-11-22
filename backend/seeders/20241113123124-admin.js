'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('Password123', 10);
    const hashedPassword2 = await bcrypt.hash('Password456', 10);
    
    await queryInterface.bulkInsert('Admins', [
      {
        admin_username: 'admin1',
        admin_password: hashedPassword1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        admin_username: 'admin2',
        admin_password: hashedPassword2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};

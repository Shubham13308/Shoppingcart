'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting 5 customer records
    await queryInterface.bulkInsert('Customer_tables', [
      {
        customer_id: 'Cust101',
        customer_name: 'John Doe',
        customer_phn: '1234567890',
        customer_email: 'john.doe@example.com',
        customer_points: '100',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customer_id: 'Cust102',
        customer_name: 'Jane Smith',
        customer_phn: '0987654321',
        customer_email: 'jane.smith@example.com',
        customer_points: '150',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customer_id: 'Cust103',
        customer_name: 'Alice Johnson',
        customer_phn: '1122334455',
        customer_email: 'alice.johnson@example.com',
        customer_points: '200',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customer_id: 'Cust104',
        customer_name: 'Bob Williams',
        customer_phn: '2233445566',
        customer_email: 'bob.williams@example.com',
        customer_points: '250',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customer_id: 'Cust105',
        customer_name: 'Charlie Brown',
        customer_phn: '3344556677',
        customer_email: 'charlie.brown@example.com',
        customer_points: '300',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Removing the customer records
    await queryInterface.bulkDelete('Customer_tables', null, {});
  }
};

'use strict';

function getRandomDate(startYear, endYear) {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Orders',
      [
        { order_id: 'ORD00001', customer_id: 'Cust101', category: 'El101', price: 499.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00002', customer_id: 'Cust102', category: 'FO102', price: 299.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00003', customer_id: 'Cust103', category: 'HO100', price: 199.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00004', customer_id: 'Cust104', category: 'El100', price: 399.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00005', customer_id: 'Cust105', category: 'BO100', price: 149.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00006', customer_id: 'Cust101', category: 'El102', price: 249.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00007', customer_id: 'Cust102', category: 'FO101', price: 199.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00008', customer_id: 'Cust103', category: 'El101', price: 549.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00009', customer_id: 'Cust104', category: 'FO100', price: 89.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00010', customer_id: 'Cust105', category: 'HO100', price: 129.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00011', customer_id: 'Cust101', category: 'BO100', price: 179.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00012', customer_id: 'Cust102', category: 'El100', price: 449.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00013', customer_id: 'Cust103', category: 'FO102', price: 229.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00014', customer_id: 'Cust104', category: 'El102', price: 199.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00015', customer_id: 'Cust105', category: 'El101', price: 349.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00016', customer_id: 'Cust101', category: 'FO100', price: 79.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00017', customer_id: 'Cust102', category: 'HO100', price: 99.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00018', customer_id: 'Cust103', category: 'FO101', price: 149.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00019', customer_id: 'Cust104', category: 'El101', price: 489.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00020', customer_id: 'Cust105', category: 'El102', price: 249.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00021', customer_id: 'Cust101', category: 'FO102', price: 329.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00022', customer_id: 'Cust102', category: 'El100', price: 299.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00023', customer_id: 'Cust103', category: 'HO100', price: 199.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
        { order_id: 'ORD00024', customer_id: 'Cust104', category: 'BO100', price: 149.99, createdAt: getRandomDate(2015, 2024), updatedAt: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Products', [
      { product_id: 'El101', product_name: 'Laptop', product_category: 'Electronics', product_description: 'A high-performance laptop with 16GB RAM and 512GB SSD.', product_price: 999.99, product_stock: 50, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'El102', product_name: 'Smartphone', product_category: 'Electronics', product_description: 'A 6.5-inch smartphone with 128GB storage and a 48MP camera.', product_price: 499.99, product_stock: 100, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ac103', product_name: 'Headphones', product_category: 'Accessories', product_description: 'Noise-canceling wireless headphones with Bluetooth 5.0.', product_price: 129.99, product_stock: 150, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'We104', product_name: 'Smartwatch', product_category: 'Wearables', product_description: 'A waterproof smartwatch with fitness tracking features.', product_price: 199.99, product_stock: 75, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'El105', product_name: 'Tablet', product_category: 'Electronics', product_description: 'A lightweight tablet with a 10-inch display and 64GB storage.', product_price: 299.99, product_stock: 120, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ac106', product_name: 'Bluetooth Speaker', product_category: 'Accessories', product_description: 'Portable Bluetooth speaker with great sound quality.', product_price: 69.99, product_stock: 180, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ac107', product_name: 'Gaming Mouse', product_category: 'Accessories', product_description: 'Ergonomic gaming mouse with RGB lighting.', product_price: 49.99, product_stock: 200, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ac108', product_name: 'Gaming Keyboard', product_category: 'Accessories', product_description: 'Mechanical gaming keyboard with customizable keys.', product_price: 99.99, product_stock: 150, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'El109', product_name: '4K Monitor', product_category: 'Electronics', product_description: '32-inch 4K monitor with high refresh rate.', product_price: 399.99, product_stock: 60, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'El110', product_name: 'Smart TV', product_category: 'Electronics', product_description: '55-inch Smart TV with 4K resolution and built-in apps.', product_price: 499.99, product_stock: 80, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho111', product_name: 'Electric Kettle', product_category: 'Home Appliances', product_description: '1.7L electric kettle with fast boiling feature.', product_price: 29.99, product_stock: 250, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho112', product_name: 'Blender', product_category: 'Home Appliances', product_description: 'High-speed blender for smoothies and shakes.', product_price: 79.99, product_stock: 100, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho113', product_name: 'Air Purifier', product_category: 'Home Appliances', product_description: 'HEPA filter air purifier for clean indoor air.', product_price: 159.99, product_stock: 150, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho114', product_name: 'Coffee Maker', product_category: 'Home Appliances', product_description: 'Automatic coffee maker with brew strength control.', product_price: 89.99, product_stock: 200, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho115', product_name: 'Refrigerator', product_category: 'Home Appliances', product_description: 'Energy-efficient refrigerator with smart cooling.', product_price: 599.99, product_stock: 30, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ac116', product_name: 'Portable Charger', product_category: 'Accessories', product_description: '10,000mAh portable charger with fast charging capability.', product_price: 19.99, product_stock: 300, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ac117', product_name: 'Power Bank', product_category: 'Accessories', product_description: 'Compact 20,000mAh power bank for long trips.', product_price: 29.99, product_stock: 250, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ac118', product_name: 'Wireless Charger', product_category: 'Accessories', product_description: 'Qi wireless charger for fast charging of smartphones.', product_price: 24.99, product_stock: 200, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ac119', product_name: 'External Hard Drive', product_category: 'Accessories', product_description: '1TB external hard drive for storing data.', product_price: 59.99, product_stock: 120, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ac120', product_name: 'USB Flash Drive', product_category: 'Accessories', product_description: '32GB USB flash drive for quick data transfer.', product_price: 14.99, product_stock: 300, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho121', product_name: 'Microwave Oven', product_category: 'Home Appliances', product_description: 'Compact microwave oven with multiple cooking presets.', product_price: 99.99, product_stock: 150, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho122', product_name: 'Washing Machine', product_category: 'Home Appliances', product_description: 'Automatic washing machine with quick wash cycle.', product_price: 399.99, product_stock: 50, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho123', product_name: 'Induction Cooktop', product_category: 'Home Appliances', product_description: 'Portable induction cooktop with 5 temperature settings.', product_price: 49.99, product_stock: 200, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho124', product_name: 'Dishwasher', product_category: 'Home Appliances', product_description: 'Dishwasher with multiple cleaning modes and eco-friendly features.', product_price: 349.99, product_stock: 80, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ac125', product_name: 'Smart Plug', product_category: 'Accessories', product_description: 'Wi-Fi smart plug for controlling home appliances remotely.', product_price: 19.99, product_stock: 180, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho126', product_name: 'Electric Fan', product_category: 'Home Appliances', product_description: 'Portable electric fan with multiple speed settings.', product_price: 39.99, product_stock: 250, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho127', product_name: 'Space Heater', product_category: 'Home Appliances', product_description: 'Personal space heater for quick room heating.', product_price: 59.99, product_stock: 150, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho128', product_name: 'Electric Griddle', product_category: 'Home Appliances', product_description: 'Non-stick electric griddle for pancakes and eggs.', product_price: 39.99, product_stock: 100, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho129', product_name: 'Lawn Mower', product_category: 'Home Appliances', product_description: 'Electric lawn mower with adjustable cutting height.', product_price: 249.99, product_stock: 60, createdAt: new Date(), updatedAt: new Date() },
      { product_id: 'Ho130', product_name: 'Water Filter', product_category: 'Home Appliances', product_description: 'Advanced water filter for home use.', product_price: 99.99, product_stock: 200, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Removing the product records
    await queryInterface.bulkDelete('Products', null, {});
  }
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer_table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer_table.init({
    customer_id: DataTypes.STRING,
    customer_name: DataTypes.STRING,
    customer_phn: DataTypes.STRING,
    customer_email: DataTypes.STRING,
    customer_points: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer_table',
  });
  return Customer_table;
};
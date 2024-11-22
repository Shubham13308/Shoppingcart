'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    admin_username: {type:DataTypes.STRING,allowNull:false},
    admin_password: {type:DataTypes.STRING,allowNull:false}
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};
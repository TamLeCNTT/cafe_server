'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Role, { foreignKey: 'roleId' })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
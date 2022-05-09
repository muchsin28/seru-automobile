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
      // define association here
    }
  };
  User.init({
    id: {  
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull: false,
      unique:true
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:true
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:true,
        isEmail:true,
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:true
      }
    },
    is_admin: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_at:{
     type:DataTypes.DATE,
     defaultValue: DataTypes.NOW
    },
    updated_at:{
     type:DataTypes.DATE,
     defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'User',
    underscored:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Year extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Year, Price}) {
      // define association here
    }
  };
  Year.init({
    id: {  
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull: false,
      unique:true
    },
    year: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty:true
      },
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
    modelName: 'Year',
    tableName: 'vehicle_year',
    underscored:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return Year;
};
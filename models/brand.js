'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Brand, Type}) {
      // define association here
      Brand.hasMany(Type)
      Type.belongsTo(Brand)
      
    }
  };
  Brand.init({
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
    modelName: 'Brand',
    tableName: 'vehicle_brand',
    underscored:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return Brand;
};
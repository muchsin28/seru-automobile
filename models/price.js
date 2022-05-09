'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({VehicleModel, Year, Price}) {
      // define association here
      Price.belongsTo(VehicleModel,{foreignKey:'model_id'})
      Price.belongsTo(Year,{foreignKey:'year_id'})
    }
  };
  Price.init({
    id: {  
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull: false,
      unique:true
    },
    code: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:true
      },
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    model_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty:true
      },
      references: {
        model: 'VehicleModel',
        key: 'id',
      },
      onUpdate: 'CASCADE',
    },
    year_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty:true
      },
      references: {
        model: 'vehicle_year',
        key: 'id',
      },
      onUpdate: 'CASCADE'
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
    modelName: 'Price',
    tableName: 'pricelist',
    underscored:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return Price;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VehicleModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Type, VehicleModel, Price}) {
      // define association here
      // Type.hasMany(VehicleModel)
      // VehicleModel.belongsTo(Type)
      // VehicleModel.hasMany(Price)
    }
  };
  VehicleModel.init({
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
    type_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'vehicle_type',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    modelName: 'VehicleModel',
    tableName: 'vehicle_model',
    underscored:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return VehicleModel;
};
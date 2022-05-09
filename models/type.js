'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Brand, Type, VehicleModel}) {
      // define association here
      Brand.hasMany(Type)
      Type.belongsTo(Brand)
      Type.hasMany(VehicleModel)
    }
  };
  Type.init({
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
    brand_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'vehicle_brand',
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
    modelName: 'Type',
    tableName: 'vechile_type',
    underscored:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
  return Type;
};
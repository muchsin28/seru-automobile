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
    static associate ({ Brand, Type, VehicleModel }) {
      // define association here
      VehicleModel.belongsTo(Brand, { foreignKey: 'brand_id' });
      VehicleModel.belongsTo(Type, { foreignKey: 'type_id' });
    }
  };
  VehicleModel.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      references: {
        model: 'vehicle_type',
        key: 'id'
      },
      onUpdate: 'CASCADE'
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      references: {
        model: 'vehicle_brand',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'VehicleModel',
    tableName: 'vehicle_model',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return VehicleModel;
};

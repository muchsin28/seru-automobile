const { VehicleModel, Brand, Type } = require('../models');
const { parseSort } = require('../helpers');

class ModelController {
  static async list (req, res, next) {
    try {
      // TODO: Enhance with search
      const limit = Number(req.query.limit || process.env.DEFAULT_QUERY_LIMIT);
      const sort = req.query.sort || process.env.DEFAULT_QUERY_SORT;
      const page = Number(req.query.page || 1);

      const query = {
        limit,
        offset: (page - 1) * limit,
        order: parseSort(sort),
        include: [
          { model: Brand, attributes: ['id', 'name'] },
          { model: Type, attributes: ['id', 'name'] }

        ]
      };

      let vehicles = await VehicleModel.findAndCountAll(query);
      const count = vehicles.count;

      vehicles = vehicles.rows.map(vehicle => {
        return {
          id: vehicle.id,
          name: vehicle.name,
          brand_id: vehicle.brand_id,
          brand: vehicle.Brand.name,
          type_id: vehicle.type_id,
          type: vehicle.Type.name,
          created_at: vehicle.created_at,
          updated_at: vehicle.updated_at
        };
      });

      return res.json({
        message: 'Success Load vehicle data',
        data: {
          total: count,
          page,
          total_pages: Math.ceil(count / limit),
          vehicles
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async get (req, res, next) {
    try {
      const { id } = req.params;
      const vehicle = await VehicleModel.findByPk(id, {
        include: [
          { model: Brand, attributes: ['id', 'name'] },
          { model: Type, attributes: ['id', 'name'] }
        ]
      });

      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found!' });
      }

      return res.json({
        message: 'Success Load data',
        data: {
          id: vehicle.id,
          name: vehicle.name,
          brand_id: vehicle.brand_id,
          brand: vehicle.Brand.name,
          type_id: vehicle.type_id,
          type: vehicle.Type.name,
          created_at: vehicle.created_at,
          updated_at: vehicle.updated_at
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async create (req, res, next) {
    try {
      const { name, type_id, brand_id } = req.body;
      let vehicle = await VehicleModel.findOne({ where: { name } });
      let brand, type;

      if (vehicle) {
        return res.status(409).json({ message: 'Vehicle already Exist!' });
      }

      vehicle = await VehicleModel.create({ name, type_id, brand_id });

      if (vehicle) {
        brand = await Brand.findByPk(vehicle.brand_id);
        type = await Type.findByPk(vehicle.type_id);
      }

      const data = {
        id: vehicle.id,
        name: vehicle.name,
        brand: brand.name,
        type: type.name,
        created_at: vehicle.created_at,
        updated_at: vehicle.updated_at
      };

      return res.json({
        message: 'Success Create data',
        data
      });
    } catch (error) {
      next(error);
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params;
      const { name, brand_id, type_id } = req.body;
      let vehicle = await VehicleModel.findByPk(id);
      let brand, type;

      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found!' });
      }

      const vehicleParams = vehicle.toJSON();

      if (name) {
        vehicleParams.name = name;
      }

      if (type_id) {
        vehicleParams.type_id = type_id;
      }

      if (brand_id) {
        vehicleParams.brand_id = brand_id;
      }

      const updatedVehicle = await VehicleModel.update(vehicleParams, { where: { id }, returning: true });

      if (updatedVehicle[0] === 1) {
        vehicle = updatedVehicle[1][0];
        brand = await Brand.findByPk(vehicle.brand_id);
        type = await Type.findByPk(vehicle.type_id);
        return res.json({
          message: 'Success update data',
          data: {
            id: vehicle.id,
            name: vehicle.name,
            brand: brand.name,
            brand_id: vehicle.brand_id,
            type: type.name,
            type_id: vehicle.type_id,
            created_at: vehicle.created_at,
            updated_at: vehicle.updated_at
          }
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete (req, res, next) {
    try {
      const { id } = req.params;
      const vehicle = await VehicleModel.findByPk(id, {
        include: [
          { model: Brand, attributes: ['id', 'name'] },
          { model: Type, attributes: ['id', 'name'] }
        ]
      });

      if (!vehicle) {
        return res.status(404).json({
          message: 'Vehicle not found !'
        });
      }

      const deleted = await VehicleModel.destroy({ where: { id } });

      if (deleted) {
        return res.json({
          message: 'Success delete data',
          data: {
            id: vehicle.id,
            name: vehicle.name,
            brand: vehicle.Brand.name,
            brand_id: vehicle.brand_id,
            type: vehicle.Type.name,
            type_id: vehicle.type_id,
            deleted_at: new Date()
          }
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ModelController;

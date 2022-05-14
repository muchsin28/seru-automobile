const { Price, Year, VehicleModel, Brand, Type } = require('../models');
const { parseSort, randomString } = require('../helpers');

class PriceController {
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
          {
            model: VehicleModel,
            attributes: ['name'],
            include: [
              {
                model: Brand, attributes: ['name']
              }, {
                model: Type, attributes: ['name']
              }]
          },
          { model: Year, attributes: ['year'] }
        ]
      };

      let pricelist = await Price.findAndCountAll(query);
      const count = pricelist.count;

      pricelist = pricelist.rows.map(price => {
        return {
          id: price.id,
          code: price.code,
          model: price.VehicleModel.name,
          model_id: price.model_id,
          brand: price.VehicleModel.Brand.name,
          type: price.VehicleModel.Type.name,
          year: price.Year.year,
          year_id: price.year_id,
          price: price.price,
          created_at: price.created_at,
          updated_at: price.updated_at
        };
      });

      return res.json({
        message: 'Success Load vehicle data',
        data: {
          total: count,
          page,
          total_pages: Math.ceil(count / limit),
          pricelist
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async get (req, res, next) {
    try {
      const { id } = req.params;
      const price = await Price.findByPk(id, {
        include: [
          {
            model: VehicleModel,
            attributes: ['name'],
            include: [
              {
                model: Brand, attributes: ['name']
              },
              {
                model: Type, attributes: ['name']
              }]
          },
          { model: Year, attributes: ['year'] }
        ]
      });

      if (!price) {
        return res.status(404).json({ message: 'Price not found!' });
      }

      return res.json({
        message: 'Success Load data',
        data: {
          id: price.id,
          code: price.code,
          model: price.VehicleModel.name,
          model_id: price.model_id,
          brand: price.VehicleModel.Brand.name,
          type: price.VehicleModel.Type.name,
          year: price.Year.year,
          year_id: price.year_id,
          price: price.price,
          created_at: price.created_at,
          updated_at: price.updated_at
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async create (req, res, next) {
    try {
      const { price, model_id, year_id } = req.body;

      const vehicle = await VehicleModel.findByPk(model_id, {
        include:
          [
            { model: Brand, attributes: ['id', 'name'] },
            { model: Type, attributes: ['id', 'name'] }
          ]
      });

      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not Found!' });
      }

      const year = await Year.findByPk(year_id);

      if (!year) {
        return res.status(404).json({ message: 'Year not Found!' });
      }

      const params = {
        price,
        code: 'SR-AUTO-' + randomString(6),
        model_id,
        year_id
      };

      const newPrice = await Price.create(params);

      let data;

      if (newPrice) {
        data = {
          id: newPrice.id,
          code: newPrice.code,
          model: vehicle.name,
          model_id: newPrice.model_id,
          brand: vehicle.Brand.name,
          type: vehicle.Type.name,
          year: year.year,
          year_id: newPrice.year_id,
          price: newPrice.price,
          created_at: newPrice.created_at,
          updated_at: newPrice.updated_at
        };
      }

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
      const { price, model_id, year_id } = req.body;
      const existingPrice = await Price.findByPk(id);
      let newPrice, vehicle, year;

      if (!existingPrice) {
        return res.status(404).json({ message: 'Price not found!' });
      }

      const priceParams = existingPrice.toJSON();

      if (price) {
        priceParams.price = price;
      }

      if (model_id) {
        priceParams.model_id = model_id;
      }

      if (year_id) {
        priceParams.year_id = year_id;
      }

      const updatedPrice = await Price.update(priceParams, { where: { id }, returning: true });
      if (updatedPrice[0] === 1) {
        newPrice = updatedPrice[1][0];
        vehicle = await VehicleModel.findByPk(existingPrice.model_id, {
          include:
            [
              { model: Brand, attributes: ['id', 'name'] },
              { model: Type, attributes: ['id', 'name'] }
            ]
        });
        year = await Year.findByPk(existingPrice.year_id);
        return res.json({
          message: 'Success update data',
          data: {
            id: newPrice.id,
            code: newPrice.code,
            model: vehicle.name,
            model_id: newPrice.model_id,
            brand: vehicle.Brand.name,
            type: vehicle.Type.name,
            year: year.year,
            year_id: newPrice.year_id,
            price: newPrice.price,
            created_at: newPrice.created_at,
            updated_at: newPrice.updated_at
          }
        });
      }

      return res.send('aoa');
    } catch (error) {
      next(error);
    }
  }

  static async delete (req, res, next) {
    try {
      const { id } = req.params;
      const price = await Price.findByPk(id, {
        include: [
          {
            model: VehicleModel,
            attributes: ['name'],
            include: [
              {
                model: Brand, attributes: ['name']
              },
              {
                model: Type, attributes: ['name']
              }]
          },
          { model: Year, attributes: ['year'] }
        ]
      });

      if (!price) {
        return res.status(404).json({
          message: 'Price not found !'
        });
      }

      const deleted = await Price.destroy({ where: { id } });

      if (deleted) {
        return res.json({
          message: 'Success delete data',
          data: {
            id: price.id,
            code: price.code,
            model: price.VehicleModel.name,
            model_id: price.model_id,
            brand: price.VehicleModel.Brand.name,
            type: price.VehicleModel.Type.name,
            year: price.Year.year,
            year_id: price.year_id,
            price: price.price,
            deleted_at: new Date()
          }
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PriceController;

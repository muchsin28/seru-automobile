const { Type } = require('../models');
const { parseSort } = require('../helpers');

class TypeController {
  static async list (req, res, next) {
    try {
      // TODO: Enhance with search, include
      const limit = Number(req.query.limit || process.env.DEFAULT_QUERY_LIMIT);
      const sort = req.query.sort || process.env.DEFAULT_QUERY_SORT;
      const page = Number(req.query.page || 1);

      const query = {
        limit,
        offset: (page - 1) * limit,
        order: parseSort(sort)
      };

      const types = await Type.findAndCountAll(query);

      return res.json({
        message: 'Success load type data',
        data: {
          total: types.count,
          page,
          total_pages: Math.ceil(types.count / limit),
          types: types.rows
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async create (req, res, next) {
    try {
      const { name } = req.body;
      let type = await Type.findOne({ where: { name } });

      if (type) {
        return res.status(409).json({ message: 'Type already Exist!' });
      }

      type = await Type.create({ name });

      return res.json({
        message: 'Success Create data',
        data: type
      });
    } catch (error) {
      next(error);
    }
  }

  static async get (req, res, next) {
    try {
      const { id } = req.params;
      const type = await Type.findByPk(id);

      if (!type) {
        return res.status(404).json({ message: 'Type not found!' });
      }

      return res.json({
        message: 'Success Load data',
        data: type
      });
    } catch (error) {
      next(error);
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      let type = await Type.findByPk(id);

      if (!type) {
        return res.status(404).json({ message: 'Type not found!' });
      }

      // TODO: Enhance with check existing Type
      const existing = await Type.findOne({ where: { name } });

      if (existing) {
        return res.status(409).json({ message: 'Type already Exist!' });
      }

      const typeParams = type.toJSON();

      typeParams.name = name;

      const updatedType = await Type.update(typeParams, { where: { id }, returning: true });

      if (updatedType[0] === 1) {
        type = updatedType[1][0];
        return res.json({
          message: 'Success update data',
          data: type
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete (req, res, next) {
    try {
      const { id } = req.params;
      const type = await Type.findByPk(id);

      if (!type) {
        return res.status(404).json({
          message: 'Type not found !'
        });
      }

      const deleted = await Type.destroy({ where: { id } });

      if (deleted) {
        return res.json({
          message: 'Success delete data',
          data: {
            id: type?.id,
            name: type?.name,
            deleted_at: new Date()
          }
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TypeController;

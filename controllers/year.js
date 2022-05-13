const { Year } = require('../models')
const { parseSort } = require('../helpers')

class YearController {
  static async list (req, res, next) {
    try {
      // TODO: Enhance with search, include
      const limit = Number(req.query.limit || process.env.DEFAULT_QUERY_LIMIT)
      const sort = req.query.sort || process.env.DEFAULT_QUERY_SORT
      const page = Number(req.query.page || 1)

      const query = {
        limit,
        offset: (page - 1) * limit,
        order: parseSort(sort)
      }

      const years = await Year.findAndCountAll(query)

      return res.json({
        message: 'Success Load Year data',
        data: {
          total: years.count,
          page,
          total_pages: Math.ceil(years.count / limit),
          years: years.rows
        }
      })
    } catch (error) {
      next(error)
    }
  }

  static async get (req, res, next) {
    try {
      const { id } = req.params
      const year = await Year.findByPk(id)

      if (!year) {
        return res.status(404).json({ message: 'Year not found!' })
      }

      return res.json({
        message: 'Success Load data',
        data: year
      })
    } catch (error) {
      next(error)
    }
  }

  static async create (req, res, next) {
    try {
      const { year } = req.body
      let yearExist = await Year.findOne({ where: { year } })

      if (yearExist) {
        return res.status(409).json({ message: 'Year already Exist!' })
      }

      yearExist = await Year.create({ year })

      return res.json({
        message: 'Success Create data',
        data: yearExist
      })
    } catch (error) {
      next(error)
    }
  }

  static async update (req, res, next) {
    try {
      const { id } = req.params
      const { year } = req.body
      let yearExist = await Year.findByPk(id)

      if (!yearExist) {
        return res.status(404).json({ message: 'Type not found!' })
      }

      let existing

      if (year) {
        existing = await Year.findOne({ where: { year } })
      }

      if (existing) {
        return res.status(409).json({ message: 'Year already Exist!' })
      }

      const yearParams = yearExist.toJSON()

      yearParams.year = year

      const updatedYear = await Year.update(yearParams, { where: { id }, returning: true })

      if (updatedYear[0] === 1) {
        yearExist = updatedYear[1][0]
        return res.json({
          message: 'Success update data',
          data: yearExist
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async delete (req, res, next) {
    try {
      const { id } = req.params
      const year = await Year.findByPk(id)

      if (!year) {
        return res.status(404).json({
          message: 'Year not found !'
        })
      }

      const deleted = await Year.destroy({ where: { id } })

      if (deleted) {
        return res.json({
          message: 'Success delete data',
          data: {
            id: year.id,
            year: year.year,
            deleted_at: new Date()
          }
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = YearController

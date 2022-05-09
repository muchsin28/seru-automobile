const {Brand} = require('../models')
const {parseSort}= require('../helpers')

class BrandController{
  static async list(req,res,next){
    try {
      //TODO: Enhance with search, include
      const limit = Number(req.query.limit || process.env.DEFAULT_QUERY_LIMIT)
      const sort = req.query.sort || process.env.DEFAULT_QUERY_SORT
      const page = Number(req.query.page || 1)

      const query = {
        limit,
        offset: (page - 1) * limit,
        order: parseSort(sort),
      }

      let brands = await Brand.findAndCountAll(query)

      return res.json({
        message:"Success load brand data",
        data: {
          total: brands.count,
          page,
          total_pages: Math.ceil(brands.count/limit),
          brands:brands.rows,
        }
      })
    } catch (error) {
      next(error)
    }
  }

  static async create(req,res,next){
    try {
      const {name}= req.body
      let brand = await Brand.findOne({where:{name}})

      if(brand){
        return res.status(409).json({message:"Brand already Exist!"})
      }

      brand = await Brand.create({name})

      return res.json({
        message:`Success Create data`,
        data:brand
      })

    } catch (error) {
      next(error)
    }
  }


  static async get(req,res,next){
    try {
      const {id}= req.params
      const brand = await Brand.findByPk(id)

      if(!brand){
        return res.status(404).json({message:"Brand not found!"})
      }

      return res.json({
        message:`Success Load data`,
        data:brand
        
      })

    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    try {
      const {id} = req.params
      const {name}= req.body
      let brand = await Brand.findByPk(id)

      if(!brand){
        return res.status(404).json({message:"Brand not found!"})
      }

      let brandParams = brand.toJSON()

      if(name){
        brandParams.name = name
      }

      const updatedBrand = await Brand.update(brandParams,{where:{id}, returning:true})

      if(updatedBrand[0] === 1){

        brand = updatedBrand[1][0]
        return res.json({
          message:"Success update data",
          data:brand
        })
      }
    } catch (error) {
      next(error)
    }
  }
  static async delete(req,res,next){
    try {
      const {id} = req.params
      let {id:brand_id, name} = await Brand.findByPk(id)

      if(!brand_id){
        return res.status(404).json({
          message:"Brand not found !"
        })
      }

      const deleted = await Brand.destroy({where:{id}})

      if(deleted){
        return res.json({
          message:"Success delete data",
          data:{
            id:brand_id,
            name,
            deleted_at: new Date()
          }
        })
      }

    } catch (error) {
      next(error)
    }
  }
}

module.exports = BrandController
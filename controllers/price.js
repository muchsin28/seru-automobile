const {Price, Year, VehicleModel, Brand, Type} = require('../models')
const {parseSort, randomString}= require('../helpers')

class PriceController{
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
        // attributes:['id', 'name', 'email', 'is_admin', 'created_at', 'updated_at']
      }

      let pricelist = await Price.findAndCountAll(query)

      return res.json({
        message:"Success Load vehicle data",
        data: {
          total: pricelist.count,
          page,
          total_pages: Math.ceil(pricelist.count/limit),
          pricelist: pricelist.rows,
        }
      })
    } catch (error) {
      next(error)
    }
  }

  static async get(req,res,next){
    try {
      const {id}= req.params
      const price = await Price.findByPk(id)

      if(!price){
        return res.status(404).json({message:"Price not found!"})
      }

      return res.json({
        message:`Success Load data`,
        data:price
      })

    } catch (error) {
      next(error)
    }
  }

  static async create(req,res,next){
    try {
      const {price, model_id, year_id}= req.body

      let vehicle = await VehicleModel.findByPk(model_id,{include: 
        [
          { model: Brand, attributes: ['id','name']},
          { model: Type, attributes: ['id','name']}
        ]
      })

      if(!vehicle){
        return res.status(404).json({message:"Vehicle not Found!"})
      }

      let year = await Year.findByPk(year_id)

      if(!year){
        return res.status(404).json({message:"Year not Found!"})
      }

      const params={
        price,
        code: 'SR-AUTO-'+randomString(6),
        model_id,
        year_id,
      }

      const newPrice= await Price.create(params)
      
      let data
      
      if(newPrice){
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
        }
      }

      return res.json({
        message:`Success Create data`,
        data
      })

    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    try {
      const {id} = req.params
      const {name, type_id}= req.body
      let vehicle = await VehicleModel.findByPk(id)

      let vehicleParams = vehicle.toJSON()

      if(name){
        vehicleParams.name = name
      }

      if(type_id){
        //TODO: Cek type_id
        vehicleParams.email = email
      }

      const updatedVehicle = await VehicleModel.update(vehicleParams,{where:{id}, returning:true})

      if(updatedVehicle[0] === 1){

        vehicle = updatedVehicle[1][0]
        return res.json({
          message:"Success update data",
          data:{
            id: vehicle.id,
            name: vehicle.name,
            type_id: vehicle.type_id,
            is_admin: user.is_admin,
            created_at:vehicle.created_at,
            updated_at:vehicle.updated_at
          }
        })

      }
    } catch (error) {
      next(error)
    }
  }
  static async delete(req,res,next){
    try {
      const {id} = req.params
      let {id:vehicle_id, name, type_id} = await VehicleModel.findByPk(id)

      if(!vehicle_id){
        return res.status(404).json({
          message:"Vehicle not found !"
        })
      }

      const deleted = await VehicleModel.destroy({where:{id}})

      if(deleted){
        return res.json({
          message:"Success delete data",
          data:{
            id:vehicle_id,
            name,
            type_id,
            deleted_at: new Date()
          }
        })
      }

    } catch (error) {
      next(error)
    }
  }
}

module.exports = PriceController
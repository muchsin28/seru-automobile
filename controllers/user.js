const {User} = require('../models')
const {parseSort}= require('../helpers')

class UserController{
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
        attributes:['id', 'name', 'email', 'is_admin', 'created_at', 'updated_at']
      }

      let users = await User.findAndCountAll(query)

      return res.json({
        message:"Success Load data",
        data: {
          total: users.count,
          page,
          total_pages: Math.ceil(users.count/limit),
          users: users.rows
        }
      })
    } catch (error) {
      next(error)
    }
  }

  static async get(req,res,next){
    try {
      const {id}= req.params
      const user = await User.findByPk(id)

      if(!user){
        return res.status(404).json({message:"User not found!"})
      }

      return res.json({
        message:`Success Load data`,
        data:{
          id: user.id,
          name: user.name,
          email: user.email,
          is_admin: user.is_admin,
          created_at:user.created_at,
          updated_at:user.updated_at
        }
      })

    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    try {
      const {id} = req.params
      const {name, email, password, is_admin}= req.body
      let user = await User.findByPk(id)

      if(!user){
        return res.status(404).json({message:"User not found!"})
      }

      let userParams = user.toJSON()

      if(name){
        userParams.name = name
      }

      if(email){
        userParams.email = email
      }

      if(password){
        userParams.password = password
      }

      userParams.is_admin = is_admin 

      const updatedUser = await User.update(userParams,{where:{id}, returning:true})

      if(updatedUser[0] === 1){

        user = updatedUser[1][0]
        return res.json({
          message:"Success update data",
          data:{
            id: user.id,
            name: user.name,
            email: user.email,
            is_admin: user.is_admin,
            created_at:user.created_at,
            updated_at:user.updated_at
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
      let {id:user_id, name, email} = await User.findByPk(id)

      if(!user_id){
        return res.status(404).json({
          message:"User not found !"
        })
      }

      const deleted = await User.destroy({where:{id}})

      if(deleted){
        return res.json({
          message:"Success delete data",
          data:{
            id:user_id,
            name,
            email,
            deleted_at: new Date()
          }
        })
      }

    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
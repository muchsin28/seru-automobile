class UserController{
  static async list(req,res,next){
    return res.json({
      message:"Ini List User"
    })
  }
  static async get(req,res,next){
    return res.json({
      message:`Ini User by ID ${req.params.id}`
    })
  }
  static async update(req,res,next){
    return res.json({
      message:"Update USer Berhasi;"
    })
  }
  static async delete(req,res,next){
    return res.json({
      message:"User telah dihapus"
    })
  }
}

module.exports = UserController
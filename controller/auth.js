const {randomUUID} = require('crypto')
const {hashPassword, checkPassword} = require('../helper')

class AuthController{
  static async register(req,res,next){
    try{
      const {name, email, password} = req.body

      const existingUser = await db.User.findOne({where:{email}})

      if (existingUser) {
        return res.status(409).json({message:"Email has been used"})
      }

      const newUser = {
        id: randomUUID(),
        name,
        email,
        password: await hashPassword(password,14),
      }

      const user = await db.User.create(newUser)

      return res.json({
        message:"Register Succesful !",
        data:{
          name:user.name,
          email:user.email
        }
      })
    } catch (e){
      next(e)
    }
  }

  static async login(req,res,next){
    try{
      const {email, password} = req.body

      const user = await db.User.findOne({where:{email}})

      if (!user) {
        return res.status(404).json({message:"You are not registered"})
      }
      
      const passwordMatch = await checkPassword(password, user.password)

      if (!passwordMatch) {
        return res.status(400).json({message:"Wrong email/password !"})
      }

      return res.json({
        message:`Welcome, ${user.name}!`,
        data:{
          name:user.name,
          email:user.email
        }
      })
    } catch (e){
      next(e)
    }
  }
}

module.exports= AuthController
const bcrypt = require('bcrypt');
module.exports = {
  hashPassword: async (password, saltRounds =10)=>{
    try {
      const salt = await bcrypt.genSalt(saltRounds)
      if(!salt) return err

      return await bcrypt.hash(password, salt)
      
    } catch (error) {
      return error
    }
  },
  checkPassword: async(password, hash)=>{
    try {
      return  await bcrypt.compare(password, hash)
    } catch (error) {
      return error
    }
  }


}
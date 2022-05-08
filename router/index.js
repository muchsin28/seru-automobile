const router = require('express').Router()
const {AuthController} = require('../controller')
const UserRoutes = require('./user')

router.use('/users', UserRoutes)

router.post('/register', (req,res,next)=>AuthController.register(req,res,next))
router.post('/login', (req,res,next)=>AuthController.login(req,res,next))

router.get('/', (req,res)=> {
  res.send(`SERU Autombile API-v.${process.env.APP_VERSION}`)
})

module.exports = router
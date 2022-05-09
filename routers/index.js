const router = require('express').Router()
const {AuthController} = require('../controllers')
const UserRoutes = require('./user')
const VehicleRoutes = require('./vehicle')

router.use('/users', UserRoutes)
router.use('/vehicles', VehicleRoutes)

router.post('/register', (req,res,next)=>AuthController.register(req,res,next))
router.post('/login', (req,res,next)=>AuthController.login(req,res,next))

router.get('/',(req,res, next)=> {
  res.send(`SERU Autombile API-v.${process.env.APP_VERSION}`)
})

module.exports = router
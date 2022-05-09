const router = require('express').Router()
const { VehicleController}= require('../controllers')
const {authenticated, is_admin} = require('../middlewares')

router.get('/', authenticated, (req,res,next)=> VehicleController.list(req,res,next))
router.get('/:id', authenticated,(req,res,next)=> VehicleController.get(req,res,next))
router.patch('/:id', authenticated, is_admin,(req,res,next)=> VehicleController.update(req,res,next))
router.delete('/:id', authenticated, is_admin, (req,res,next)=> VehicleController.delete(req,res,next))

module.exports = router
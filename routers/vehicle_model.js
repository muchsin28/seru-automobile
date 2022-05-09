const router = require('express').Router()
const {validate,IdRules, createVehicleRules,updateVehicleRules}= require('../middlewares').validator
const {ModelController}= require('../controllers')
const {authenticated, is_admin} = require('../middlewares')

router.get('/:id', authenticated,IdRules(), validate,(req,res,next)=> ModelController.get(req,res,next))
router.patch('/:id', authenticated, is_admin,updateVehicleRules(), validate,(req,res,next)=> ModelController.update(req,res,next))
router.delete('/:id', authenticated, is_admin, IdRules(), validate,(req,res,next)=> ModelController.delete(req,res,next))
router.post('/', authenticated,is_admin, createVehicleRules(), validate,(req,res,next)=> ModelController.create(req,res,next))
router.get('/', authenticated, (req,res,next)=> ModelController.list(req,res,next))

module.exports = router
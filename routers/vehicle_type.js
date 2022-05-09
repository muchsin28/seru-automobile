const router = require('express').Router()
const {validate,IdRules,nameRules}= require('../middlewares').validator
const { TypeController}= require('../controllers')
const {authenticated, is_admin} = require('../middlewares')

router.get('/:id', authenticated,IdRules(), validate,(req,res,next)=> TypeController.get(req,res,next))
router.patch('/:id', authenticated, is_admin,IdRules(),validate,(req,res,next)=> TypeController.update(req,res,next))
router.delete('/:id', authenticated, is_admin, IdRules(), validate,(req,res,next)=> TypeController.delete(req,res,next))
router.get('/', authenticated, (req,res,next)=> TypeController.list(req,res,next))
router.post('/', authenticated,is_admin,  nameRules(), validate,(req,res,next)=> TypeController.create(req,res,next))

module.exports = router
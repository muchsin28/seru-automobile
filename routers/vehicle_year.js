const router = require('express').Router()
const { YearController}= require('../controllers')
const {validate,IdRules,yearRules, updateYearRules}= require('../middlewares').validator
const {authenticated, is_admin} = require('../middlewares')

router.get('/:id', authenticated,IdRules(), validate,(req,res,next)=> YearController.get(req,res,next))
router.patch('/:id', authenticated, is_admin, updateYearRules(), validate,(req,res,next)=> YearController.update(req,res,next))
router.delete('/:id', authenticated, is_admin, IdRules(), validate,(req,res,next)=> YearController.delete(req,res,next))
router.post('/', authenticated,is_admin, yearRules(), validate,(req,res,next)=> YearController.create(req,res,next))
router.get('/', authenticated, (req,res,next)=> YearController.list(req,res,next))

module.exports = router
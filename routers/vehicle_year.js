const router = require('express').Router()
const { YearController}= require('../controllers')
const {authenticated, is_admin} = require('../middlewares')

router.get('/:id', authenticated,(req,res,next)=> YearController.get(req,res,next))
router.patch('/:id', authenticated, is_admin,(req,res,next)=> YearController.update(req,res,next))
router.delete('/:id', authenticated, is_admin, (req,res,next)=> YearController.delete(req,res,next))
router.get('/', authenticated, (req,res,next)=> YearController.list(req,res,next))
router.post('/', authenticated,is_admin, (req,res,next)=> YearController.create(req,res,next))

module.exports = router
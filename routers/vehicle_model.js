const router = require('express').Router()
const { ModelController}= require('../controllers')
const {authenticated, is_admin} = require('../middlewares')

router.get('/:id', authenticated,(req,res,next)=> ModelController.get(req,res,next))
router.patch('/:id', authenticated, is_admin,(req,res,next)=> ModelController.update(req,res,next))
router.delete('/:id', authenticated, is_admin, (req,res,next)=> ModelController.delete(req,res,next))
router.get('/', authenticated, (req,res,next)=> ModelController.list(req,res,next))
router.post('/', authenticated,is_admin, (req,res,next)=> ModelController.create(req,res,next))

module.exports = router
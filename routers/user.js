const router = require('express').Router()
const {UserController}= require('../controllers')
const {authenticated, is_admin} = require('../middlewares')

router.get('/', authenticated, (req,res,next)=> UserController.list(req,res,next))
router.get('/:id', authenticated,(req,res,next)=> UserController.get(req,res,next))
router.patch('/:id', authenticated, is_admin,(req,res,next)=> UserController.update(req,res,next))
router.delete('/:id', authenticated, is_admin, (req,res,next)=> UserController.delete(req,res,next))

module.exports = router
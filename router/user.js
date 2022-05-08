const router = require('express').Router()
const {UserController}= require('../controller')

router.get('/', (req,res,next)=> UserController.list(req,res,next))
router.get('/:id', (req,res,next)=> UserController.get(req,res,next))
router.patch('/:id', (req,res,next)=> UserController.update(req,res,next))
router.delete('/:id', (req,res,next)=> UserController.delete(req,res,next))

module.exports = router
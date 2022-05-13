const router = require('express').Router()
const { validate, IdRules, createPriceRules, updatePriceRules } = require('../middlewares').validator
const { PriceController } = require('../controllers')
const { authenticated, is_admin } = require('../middlewares')

router.get('/:id', authenticated, IdRules(), validate, (req, res, next) => PriceController.get(req, res, next))
router.patch('/:id', authenticated, is_admin, updatePriceRules(), validate, (req, res, next) => PriceController.update(req, res, next))
router.delete('/:id', authenticated, is_admin, IdRules(), validate, (req, res, next) => PriceController.delete(req, res, next))
router.post('/', authenticated, is_admin, createPriceRules(), validate, (req, res, next) => PriceController.create(req, res, next))
router.get('/', authenticated, (req, res, next) => PriceController.list(req, res, next))

module.exports = router

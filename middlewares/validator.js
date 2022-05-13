const { body, param, validationResult } = require('express-validator')

exports.validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const error = errors.errors[0]

  return res.status(400).json({
    code: 400,
    message: error.msg,
    field: error.param
  })
}

exports.registerRules = () => {
  return [
    body('email').isEmail().normalizeEmail({ gmail_remove_dots: false })
      .withMessage('Invalid Email'),
    body('password').isLength({ min: 8 }).withMessage('Password too weak! min. 8 chars'),
    body('name').notEmpty().withMessage('Name Required')
  ]
}

exports.loginRules = () => {
  return [
    body('email').isEmail().normalizeEmail({ gmail_remove_dots: false })
      .withMessage('Invalid Email'),
    body('password').notEmpty().withMessage('Password required')
  ]
}

exports.IdRules = () => {
  return [
    param('id').isInt().withMessage('id must be integer.')
  ]
}

exports.nameRules = () => {
  return [
    body('name').notEmpty().withMessage('Name Required')
  ]
}

exports.updateYearRules = () => {
  return [
    param('id').isInt().withMessage('id must be integer.'),
    body('year').optional().isInt({ min: 1900, max: 2023 }).withMessage('Year must be in range 1900-2023')
  ]
}

exports.yearRules = () => {
  return [
    body('year').isInt({ min: 1900, max: 2023 }).withMessage('Year must be in range 1900-2023')
  ]
}

exports.createVehicleRules = () => {
  return [
    body('name').notEmpty().withMessage('name Required'),
    body('brand_id').isInt().withMessage('brand_id must be integer.'),
    body('type_id').isInt().withMessage('type_id must be integer.')

  ]
}

exports.updateVehicleRules = () => {
  return [
    body('brand_id').optional().isInt().withMessage('brand_id must be integer.'),
    body('type_id').optional().isInt().withMessage('type_id must be integer.')
  ]
}

exports.createPriceRules = () => {
  return [
    body('price').isInt().withMessage('price must be integer'),
    body('model_id').isInt().withMessage('model_id must be integer.'),
    body('year_id').isInt().withMessage('year_id must be integer.')
  ]
}

exports.updatePriceRules = () => {
  return [
    body('price').optional().isInt().withMessage('price must be integer'),
    body('model_id').optional().isInt().withMessage('model_id must be integer.'),
    body('year_id').optional().isInt().withMessage('year_id must be integer.')
  ]
}

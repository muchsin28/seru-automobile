const router = require('express').Router();
const { validate, registerRules, loginRules } = require('../middlewares').validator;
const { AuthController } = require('../controllers');

const UserRoutes = require('./user');
const BrandRoutes = require('./vehicle_brand');
const TypeRoutes = require('./vehicle_type');
const ModelRoutes = require('./vehicle_model');
const PriceRoutes = require('./pricelist');
const YearRoutes = require('./vehicle_year');

router.use('/users', UserRoutes);
router.use('/brands', BrandRoutes);
router.use('/types', TypeRoutes);
router.use('/vehicles', ModelRoutes);
router.use('/pricelist', PriceRoutes);
router.use('/years', YearRoutes);

router.post('/register', registerRules(), validate, (req, res, next) => AuthController.register(req, res, next));
router.post('/login', loginRules(), validate, (req, res, next) => AuthController.login(req, res, next));

router.get('/', (req, res, next) => {
  res.send(`SERU Autombile API-v.${process.env.APP_VERSION}`);
});

module.exports = router;

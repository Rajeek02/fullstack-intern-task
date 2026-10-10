const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../middleware/validate');
const { optionalAuth } = require('../middleware/auth');
const { idParamSchema, listQuerySchema } = require('../controllers/validators');
const ctrl = require('../controllers/templateController');

router.get('/', optionalAuth, validate(listQuerySchema, 'query'), asyncHandler(ctrl.list));
router.get('/categories', asyncHandler(ctrl.categories)); // must be declared before '/:id'
router.get('/:id', optionalAuth, validate(idParamSchema, 'params'), asyncHandler(ctrl.getOne));

module.exports = router;

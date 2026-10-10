const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');
const { templateIdParamSchema } = require('../controllers/validators');
const ctrl = require('../controllers/favoriteController');

router.use(requireAuth);
router.get('/', asyncHandler(ctrl.list));
router.post('/:templateId', validate(templateIdParamSchema, 'params'), asyncHandler(ctrl.add));
router.delete('/:templateId', validate(templateIdParamSchema, 'params'), asyncHandler(ctrl.remove));

module.exports = router;

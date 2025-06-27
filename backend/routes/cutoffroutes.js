const express = require('express');
const router = express.Router();
const cutoffController = require('../controllers/cutoffcontroller');

router.get('/', cutoffController.getAllCutoffs);
router.get('/:year', cutoffController.getCutoffByYear);
router.post('/', cutoffController.createCutoff);

module.exports = router;

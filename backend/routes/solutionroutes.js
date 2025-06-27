const express = require('express');
const router = express.Router();
const solutionController = require('../controllers/solutioncontroller');

router.get('/:paperId', solutionController.getSolutionsByPaperId);
router.post('/', solutionController.createSolution);

module.exports = router;

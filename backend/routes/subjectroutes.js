const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectcontroller');

router.get('/', subjectController.getAllSubjects);
router.post('/', subjectController.createSubject);

module.exports = router;

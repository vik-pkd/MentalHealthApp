const express = require('express');

const prescriptionControllers = require('../controllers/prescriptionController');

const router = express.Router();

router.get('/:patient', prescriptionControllers.GetReminders);

router.post('/', prescriptionControllers.AddPrescription);

module.exports = router;
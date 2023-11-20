const express = require('express');

const doctorControllers = require('../controllers/doctorControllers');

const router = express.Router();

const { validateDoctorSignUp, doctorValidation } = require('../middleware/validation/doctor')

// To get list of all patients
router.get('/get-doctors', doctorControllers.getDoctors);

// To assign a particular patient to doctor
router.post('/add-doctor', validateDoctorSignUp, doctorValidation, doctorControllers.addDoctor);

module.exports = router;
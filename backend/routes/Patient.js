const express = require('express');
const { isAuth } = require('../middleware/auth');

const patientControllers = require('../controllers/patientControllers');

const router = express.Router();

// To get list of all patients
router.get('/get-patients', isAuth, patientControllers.getPatients);

// To assign a particular patient to doctor
router.post('/add-patient', isAuth, patientControllers.addPatient);

// T
router.get('/:patientId/points/:point', patientControllers.getPoints);

module.exports = router;
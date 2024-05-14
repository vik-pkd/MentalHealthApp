const express = require('express');
const { isDoctorAuth, isDoctorOrPatientAuth, isPatientAuth, isDoctorOrPatientAuthOrCaregiverAuth } = require('../middleware/auth');

const patientControllers = require('../controllers/patientControllers');
const upload = require('../utils/multer');

const router = express.Router();

const { patientValidation, validatePatientSignUp, validatePatientSignIn } = require('../middleware/validation/patient');

// To get list of all patients
router.get('/get-patients', isDoctorOrPatientAuthOrCaregiverAuth, patientControllers.getPatients);

// To assign a particular patient to doctor
router.post('/add-patient', isDoctorAuth, patientControllers.addPatient);

// get details of a patient
router.get('/patient/:_id', isDoctorOrPatientAuthOrCaregiverAuth, patientControllers.getDetails);

router.post('/sign-in', validatePatientSignIn, patientValidation, patientControllers.patientSignIn);

router.post('/add-photo', upload.single('profile'), patientControllers.patientAddPhoto);

router.post('/verify-photo', upload.single('profile'), patientControllers.patientVerifyPhoto);

router.get('/:patientId/points/:point', patientControllers.getPoints);

router.get('/prescriptions/patient/:_id', isDoctorOrPatientAuthOrCaregiverAuth, patientControllers.getPrescriptions);
router.get('/games/patient/:_id', isDoctorOrPatientAuthOrCaregiverAuth, patientControllers.getGames);

router.get('/reminders', isPatientAuth, patientControllers.getReminders);
router.get('/alerts', isPatientAuth, patientControllers.getAlerts);
router.get('/activities', isPatientAuth, patientControllers.getActivities);
router.put('/taken-medicine', isPatientAuth, patientControllers.takeMedicine);

module.exports = router;
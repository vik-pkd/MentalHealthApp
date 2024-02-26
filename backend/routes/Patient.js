const express = require('express');
const { isAuth } = require('../middleware/auth');

const patientControllers = require('../controllers/patientControllers');
const upload = require('../utils/multer');

const router = express.Router();

const { patientValidation, validatePatientSignUp, validatePatientSignIn } = require('../middleware/validation/patient');

// To get list of all patients
router.get('/get-patients', isAuth, patientControllers.getPatients);

// To assign a particular patient to doctor
// router.post('/add-patient', isAuth, patientControllers.addPatient);

// get details of a patient
router.get('/patient/:_id', isAuth, patientControllers.getDetails);

router.post('/sign-in', validatePatientSignIn, patientValidation, patientControllers.patientSignIn);

router.post('/add-photo', upload.single('profile'), patientControllers.patientAddPhoto);

router.post('/verify-photo', upload.single('profile'), patientControllers.patientVerifyPhoto);

router.get('/:patientId/points/:point', patientControllers.getPoints);

module.exports = router;
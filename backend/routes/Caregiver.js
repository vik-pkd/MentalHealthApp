const express = require('express');

const caregiverControllers = require('../controllers/caregiverControllers');
const { isAuth } = require('../middleware/auth');
const upload = require('../utils/multer');

const router = express.Router();

const { validateCaregiverSignUp, caregiverValidation, validateCaregiverSignIn } = require('../middleware/validation/caregiver')

// To get list of all caregivers
router.get('/get-caregivers', caregiverControllers.getCaregivers);

// Authentication routes for caregiver
router.post('/add-caregiver', validateCaregiverSignUp, caregiverValidation, caregiverControllers.addCaregiver);
router.post('/sign-in', validateCaregiverSignIn, caregiverValidation, caregiverControllers.caregiverSignIn);

// get all patients for a particular caregiver
router.post('/get-patients', caregiverControllers.getPatientsCaregiver);

// check prescription pathway for the caregiver
router.post('/add-alert', caregiverControllers.addIssueAlert);

module.exports = router;
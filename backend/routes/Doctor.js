const express = require('express');

const doctorControllers = require('../controllers/doctorControllers');
const { isDoctorAuth } = require('../middleware/auth');
const upload = require('../utils/multer');

const router = express.Router();

const { validateDoctorSignUp, doctorValidation, validateDoctorSignIn } = require('../middleware/validation/doctor')

// To get list of all patients
router.get('/get-doctors', doctorControllers.getDoctors);
router.get('/get-games', doctorControllers.getGames);

// To assign a particular patient to doctor
router.post('/add-doctor', validateDoctorSignUp, doctorValidation, doctorControllers.addDoctor);
router.post('/sign-in', validateDoctorSignIn, doctorValidation, doctorControllers.doctorSignIn);

// router.post('/save-key', doctorControllers.doctorAddKey);
// router.post('/verify-key', doctorControllers.verifyBiometrics);

router.post('/add-prescription/patient/:_id', isDoctorAuth, upload.single('image'), doctorControllers.addPrescription);
router.post('/add-medicine', isDoctorAuth, upload.single('image'), doctorControllers.addMedicine);
router.post('/add-activity', isDoctorAuth, doctorControllers.addActivity);

router.post('/assign-games', isDoctorAuth, doctorControllers.assignGames);

module.exports = router;
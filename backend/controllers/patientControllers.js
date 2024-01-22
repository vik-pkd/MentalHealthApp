const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getPatients = async (req, res) => {
    try {
        const doctorId = req.user._id;
        const searchText = req.query.searchText.toLowerCase();
        const patients = (await Doctor.findById(doctorId).populate('patients')).patients;
        const includedPatients = patients.filter((patient) => {
            return patient.email.toLowerCase().includes(searchText) || patient.name.toLowerCase().includes(searchText);
        })
        res.send(includedPatients);
    } catch (err) {
        res.send(err);
    }
}

module.exports.addPatient = async (req, res) => {
    try {
        const doctorId = req.user._id;
        const doctor = await Doctor.findById(doctorId);
        const isNewUser = await Patient.isThisEmailInUse(req.body.email);
        if (!isNewUser) {
            return res.send({ status: 'failure', message: 'This email is already in use, try to sign-in' })
        }
        const patient = new Patient({
            ...req.body,
            Score: 0,
            Streak: 0,
            doctor: doctorId
        })
        
        await patient.save();
        await doctor.addPatient(patient._id);
        res.send({ status: 'success' });
    } catch (error) {
        res.send(`Error occured while adding patient ${error}`);
    }
}

module.exports.getPoints = async (req, res) => {
    try {
        // const patientId = '65258f35bdf06bf2d2632580';
        const patientId = req.params.patientId;
        const patient = (await Patient.find({ _id: patientId }))[0];
        if (!patient.Score) {
            patient.Score = 0;
        }
        res.send({ points: patient.Score });
    } catch (error) {
        res.send({ error: error });
    }
}
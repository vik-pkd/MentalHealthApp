const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.send(patients);
    } catch (err) {
        res.send(err);
    }
}

module.exports.addPatient = async (req, res) => {
    try {
        // TODO fetch usedId from session or cookies after auth (hardcoded for now)
        const doctorId = '652591304ae9e13d68002868';
        const patientId = req.body.patient;
        // add patient and doctor in each other's list
        const doctor =  (await Doctor.find({ _id: doctorId}))[0];
        const patient = (await Patient.find({ _id: patientId}))[0];
        if (!doctor.patients.includes(new ObjectId(patientId))) {
            doctor.patients.push(new ObjectId(patientId));
            doctor.save();
        }
        if (!patient.doctors.includes(new ObjectId(doctorId))) {
            patient.doctors.push(new ObjectId(doctorId));
            patient.save();
        }
        res.send({ status: 'success'});
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
        res.send({ points: patient.Score});
    } catch (error) {
        res.send({ error: error});
    }
}
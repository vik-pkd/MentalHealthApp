const Patient = require('../models/patient');
const Doctor = require('../models/doctor')
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const canvas = require('canvas');
const faceapi = require('@vladmandic/face-api');
const Prescription = require('../models/prescription');
const DoseHistory = require('../models/doseHistory');

module.exports.getPatients = async (req, res) => {
    // console.log('Inside search patients!')
    try {
        const doctorId = req.user._id;
        const searchText = req.query.searchText.toLowerCase();
        const patients = (await Doctor.findById(doctorId).populate('patients')).patients;
        const includedPatients = patients.filter((patient) => {
            return searchText.length > 0 && (patient.email.toLowerCase().includes(searchText) || patient.name.toLowerCase().includes(searchText));
        })
        res.send(includedPatients);
    } catch (err) {
        res.send(err);
    }
}

module.exports.addPatient = async (req, res) => {
    console.log('Inside add patients!')
    try {
        const doctorId = req.user._id;

        const doctor = await Doctor.findOne({ _id: doctorId });
        // console.log(doctor);
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
        res.send({ status: 'failure', message: 'Could not add patient' });
    }
}

module.exports.getDetails = async (req, res) => {
    // TODO logic to be added when patient and caregiver login will be added
    try {
        const doctorId = req.user._id;
        const patientId = new ObjectId(req.params._id);
        const patients = (await Doctor.findById(doctorId)).patients;
        if (patients.includes(patientId)) {
            const patient = await Patient.findById(patientId);
            const { _id, name, email, age } = patient;
            const dataToSend = { _id, name, email, age };
            res.send({ status: 'Success', data: dataToSend });
        } else {
            res.send({ status: 'failure', message: 'Not allowed action' });
        }
    } catch (err) {
        console.log(err);
        res.send({ status: 'failure', message: 'Could not fetch patient details' });
    }

};


module.exports.patientSignIn = async (req, res) => {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email })

    if (!patient) return res.json({ status: 'failure', message: 'Patient not found, with given email!' })

    const isMatch = await patient.comparePassword(password);
    if (!isMatch) return res.json({ status: 'failure', message: 'email / password does not match!' })
    const token = jwt.sign({ userId: patient._id, role: 'patient' }, process.env.JWT_SECRET, { expiresIn: '1d' })
    console.log('patient signed in', token);

    res.send({ status: 'success', patient, token })
}

module.exports.patientAddPhoto = async (req, res) => {

    const { userId } = req.body;
    console.log(req.file);
    try {
        const profileBuffer = req.file.buffer;
        const img = await canvas.loadImage(profileBuffer);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        const patient = await Patient.findByIdAndUpdate(userId, { face: detections.descriptor });
        res.send({ status: 'success', message: 'Your profile is updated!' });
    }
    catch (error) {
        res.send({ status: 'failure', message: 'Error while processing the image!' })
    }

}

async function getDescriptorsFromDB(image) {
    // Get all the face data from mongodb and loop through each of them to read the data
    let faces = await Patient.find();
    for (i = 0; i < faces.length; i++) {
        // Change the face data descriptors from Objects to Float32Array type
        for (j = 0; j < faces[i].face.length; j++) {
            faces[i].face[j] = new Float32Array(Object.values(faces[i].face[j]));
        }
        // Turn the DB face docs to
        faces[i] = new faceapi.LabeledFaceDescriptors(String(faces[i]._id), faces[i].face);
    }

    // Load face matcher to find the matching face
    const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);

    // Read the image using canvas or other method
    const img = await canvas.loadImage(image);
    let temp = faceapi.createCanvasFromMedia(img);
    // Process the image for the model
    const displaySize = { width: img.width, height: img.height };
    faceapi.matchDimensions(temp, displaySize);

    // Find matching faces
    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));
    return results;
}

module.exports.patientVerifyPhoto = async (req, res) => {

    try {
        const profileBuffer = req.file.buffer;
        let result = await getDescriptorsFromDB(profileBuffer);
        const user = await Patient.findOne({ _id: result[0]._label });

        console.log(result);

        res.send({ status: 'success', message: user });
    }
    catch (error) {
        res.send({ status: 'failure', message: 'No faces were matched!' })
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

module.exports.getPrescriptions = async (req, res) => {
    try {
        const doctorId = req.user._id;
        const patientId = new ObjectId(req.params._id);
        // console.log(doctorId, patientId);
        const prescriptions = (await Prescription.find({patient: patientId})).map(item => ({
            _id: item._id,
            patient: item.patient,
            medicine: item.medicine,
            quantity: item.quantity,
            start_date: item.start_date,
            end_date: item.end_date,
        }));
        res.send({ status: "success", prescriptions: prescriptions });
    } catch (err) {
        res.send({ status: "failure" });
    }
};

module.exports.getReminders = async (req, res) => {
    const patientId = req.user._id;
    console.log('reminders fetching...', patientId);
    const current_date = new Date();
    // get all prescriptions of patient
    // const query = { $and: [ {patient: patientId}, ] };
    // , {start_date: { $lte : current_date}}, {end_date: { $gt: current_date}}
    const condition1 = {patient: patientId};
    const condition2 = {start_date: { $lte : current_date}};
    const condition3 = {end_date: { $gt: current_date}};
    const prescriptions = (await Prescription.find({ $and: [condition1, condition2, condition3] })).map(item => ({
        _id: item._id,
        patient: item.patient,
        medicine: item.medicine,
        quantity: item.quantity,
        doseTimings: item.doseTimings
    }));
    const reminders = [];
    for (let i = 0; i < prescriptions.length; i++) {
        const ele = prescriptions[i];
        for (let j = 0; j < ele.doseTimings.length; j++) {
            const doseTime = ele.doseTimings[j];
            reminders.push({
                prescriptionId: ele._id,
                medicine: ele.medicine,
                quantity: ele.quantity,
                time: doseTime
            });            
        }
    }
    reminders.sort((a, b) => a.time.getTime() - b.time.getTime());
    res.send({status: "success", reminders: reminders});
};

module.exports.takeMedicine = async (req, res) => {
    try {
        const patientId = req.user._id;
        const { prescriptionId, doseIndex } = req.body;

        // TODO time validation
        const doseHistory = new DoseHistory({
            patient: patientId,
            prescription: prescriptionId,
            date: new Date(),
            slot: doseIndex,
            istaken: true
        });
        await doseHistory.save();
        res.send({status: "success"});        
    } catch (error) {
        res.send({status: "failure"});
    }
}
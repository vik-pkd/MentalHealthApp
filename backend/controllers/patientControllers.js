const Patient = require('../models/patient');
const Doctor = require('../models/doctor')
const Caregiver = require('../models/caregiver')
const Alert = require('../models/alert')
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const canvas = require('canvas');
const faceapi = require('@vladmandic/face-api');
const Prescription = require('../models/prescription');
const DoseHistory = require('../models/doseHistory');
const Activity = require('../models/activity');
const Game = require('../models/game');
const { areDatesOnSameDay } = require('../utils/date');

module.exports.getPatients = async (req, res) => {
    // console.log('Inside search patients!')
    try {
        const userId = req.user._id;
        const searchText = req.query.searchText.toLowerCase();

        // Try to find the user as a Doctor or Caregiver
        let user = await Doctor.findById(userId).populate('patients');
        if (!user) {
            user = await Caregiver.findById(userId).populate('patients');
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found as either Doctor or Caregiver' });
        }

        // Filter patients based on the search text
        const patients = user.patients.filter(patient =>
            searchText.length > 0 &&
            (patient.email.toLowerCase().includes(searchText) || patient.name.toLowerCase().includes(searchText))
        );

        res.send(patients);
    } catch (err) {
        res.send(err);
    }
}

module.exports.addPatient = async (req, res) => {
    try {
        const doctorId = req.user._id;
        const doctor = await Doctor.findOne({ _id: doctorId });
        const caregiverid = new ObjectId(req.body.caregiverid);
        const caregiver = await Caregiver.findById(caregiverid);
        // console.log(caregiverid);
        // console.log(caregiver);


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
        await caregiver.addPatient(patient._id);
        res.send({ status: 'success' });
    } catch (error) {
        res.send({ status: 'failure', message: 'Could not add patient' });
    }
}

module.exports.getDetails = async (req, res) => {
    try {
        const userId = req.user._id; // ID of the authenticated user (doctor or caregiver)
        const patientId = new ObjectId(req.params._id); // Convert string ID to ObjectId

        let user = await Doctor.findById(userId);
        if (!user) {
            user = await Caregiver.findById(userId);
        }

        if (!user) {
            return res.status(404).json({ status: 'failure', message: 'User not found' });
        }

        // Check if the patientId is in the user's list of patients
        if (user.patients.includes(patientId)) {
            const patient = await Patient.findById(patientId);
            if (!patient) {
                return res.status(404).json({ status: 'failure', message: 'Patient not found' });
            }
            const { _id, name, email, age } = patient;
            const dataToSend = { _id, name, email, age };
            res.send({ status: 'Success', data: dataToSend });
        } else {
            res.status(403).json({ status: 'failure', message: 'Not allowed action' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'failure', message: 'Could not fetch patient details' });
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
        const patientId = new ObjectId(req.params._id);
        // console.log(doctorId, patientId);
        const prescriptions = (await Prescription.find({ patient: patientId })).map(item => ({
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



module.exports.getGames = async (req, res) => {
    try {
        const patientId = new ObjectId(req.params._id);
        if (!ObjectId.isValid(patientId)) {
            return res.status(400).send({ status: "failure", message: "Invalid patient ID" });
        }

        const patient = await Patient.findById(patientId)
            .populate({
                path: 'games',
                select: 'title description category',
                populate: {
                    path: 'category',
                    select: 'name'
                }
            });

        if (!patient) {
            return res.status(404).send({ status: "failure", message: "Patient not found" });
        }

        const games = patient.games.map(game => ({
            title: game.title,
            description: game.description,
            category: game.category.name
        }));

        res.send({ status: "success", games });
    } catch (err) {
        console.error("Error fetching games: ", err);
        res.status(500).send({ status: "failure", message: err.message });
    }
};


module.exports.getAlerts = async (req, res) => {

    try {
        const patientId = req.user._id;
        console.log('alerts fetching...', patientId);
        const alerts = (await Alert.find({ patient: patientId }));
        // console.log(alerts);

        reminders = []
        for (let i = 0; i < alerts.length; i++) {
            const prescriptionId = alerts[i].prescription;
            const caregiverId = alerts[i].caregiver;

            const caregiver = (await Caregiver.findOne({ _id: caregiverId }));
            const ele = (await Prescription.findOne({ _id: prescriptionId }));

            // console.log(caregiver);
            // console.log(ele);

            for (let j = 0; j < ele.doseTimings.length; j++) {
                const doseTime = ele.doseTimings[j];

                reminders.push({
                    prescriptionId: ele._id,
                    medicine: ele.medicine,
                    quantity: ele.quantity,
                    time: doseTime,
                    doseIndex: j,
                    caregiver: caregiver.name
                });
            }
        }
        reminders.sort((a, b) => a.time.getTime() - b.time.getTime());
        res.send({ status: "success", alerts: reminders });
    }
    catch (err) {
        res.send({ status: "failure" });
    }
}

module.exports.getReminders = async (req, res) => {

    try {
        const patientId = req.user._id;
        console.log('reminders fetching...', patientId);
        const current_date = new Date();
        // get all prescriptions of patient
        // const query = { $and: [ {patient: patientId}, ] };
        // , {start_date: { $lte : current_date}}, {end_date: { $gt: current_date}}
        // const condition1 = { patient: patientId };
        const reminders = (await DoseHistory.find({ patient: patientId, istaken: false }))
            .filter(history => areDatesOnSameDay(history.date, new Date()));
        const remindersWithDetails = [];
        for (let i = 0; i < reminders.length; i++) {
            const reminder = reminders[i];
            const prescription = await Prescription.findOne({ _id: reminder.prescription });
            // const reminderDate = new Date(reminder.time);
            // reminderDate.setHours(doseTime.getHours());
            // reminderDate.setMinutes(doseTime.getMinutes());
            remindersWithDetails.push({
                _id: reminder._id,
                prescriptionId: reminder.prescription,
                patient: reminder.patient,
                medicine: prescription.medicine,
                quantity: prescription.quantity,
                slot: reminder.slot,
                istaken: reminder.istaken,
                date: reminder.time,
                edited: reminder.edited
            });
        }
        remindersWithDetails.sort((a, b) => a.date.getTime() - b.date.getTime());
        res.send({ status: "success", reminders: remindersWithDetails });
    }
    catch (error) {
        console.log('error fetching reminders : ', error);
        res.send({ status: "failure", reminders: [] });
    }
};

module.exports.takeMedicine = async (req, res) => {
    try {
        const patientId = req.user._id;
        const { _id } = req.body;
        // TODO time validation
        const doseHistory = await DoseHistory.findOne({ _id: new ObjectId(_id) });
        doseHistory.istaken = true;
        doseHistory.edited = false;
        await doseHistory.save();
        res.send({ status: "success" });
    } catch (error) {
        console.log(error);
        res.send({ status: "failure" });
    }
}

// A function to get all activities and their associated game names for a given patient
module.exports.getActivities = async (req, res) => {

    try {
        // Find all activities for the given patient and populate the 'game' field to get game details
        const patientId = req.user._id;
        console.log('activities fetching...', patientId);
        const activities = await Activity.find({ patient: patientId })
            .populate('game', 'name')
            .exec();

        // Transform the data to include only necessary information
        const activitiesInfo = activities.map(activity => ({
            gameName: activity.game.name, // Assumes game is populated
            points: activity.points,
            startDate: activity.start_date,
            endDate: activity.end_date,
        }));

        console.log(activitiesInfo);

        res.send({ status: "success", activities: activitiesInfo });
    } catch (error) {
        console.error('Error getting activities for patient:', error);
        res.send({ status: "failure" });
    }
};
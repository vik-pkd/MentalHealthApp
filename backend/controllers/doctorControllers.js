const fs = require('fs');

const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Prescription = require('../models/prescription');

module.exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.send(doctors);
    } catch (err) {
        res.send(err);
    }
}

module.exports.addDoctor = async (req, res) => {

    const { name, email, password, age } = req.body;

    try {
        const isNewUser = await Doctor.isThisEmailInUse(email);
        if (!isNewUser) {
            return res.send({ status: 'failure', message: 'This email is already in use, try to sign-in' })
        }

        const key = "";
        const doctor = Doctor({ name, email, password, age, key })
        await doctor.save();
        res.send({ status: 'success' });
    } catch (error) {
        res.send(`Error occured while adding doctor ${error}`);
    }
}

module.exports.doctorSignIn = async (req, res) => {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email })

    if (!doctor) return res.json({ status: 'failure', message: 'Doctor not found, with given email!' })

    const isMatch = await doctor.comparePassword(password);
    if (!isMatch) return res.json({ status: 'failure', message: 'email / password does not match!' })

    const token = jwt.sign({ userId: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.send({ status: 'success', doctor, token })
}


module.exports.doctorAddKey = async (req, res) => {
    const { userId, publicKey } = req.body;

    const updateDocument = {
        $set: {
            key: publicKey,
        },
    };
    const doctor = await Doctor.findOneAndUpdate({ _id: userId }, updateDocument)

    // console.log(doctor);
    if (!doctor) return res.json({ status: 'failure', message: 'Doctor not found, with given id!' })

    res.send({ status: 'success', doctor })
}

module.exports.verifyBiometrics = async (req, res) => {
    const { signature, payload } = req.body;
    const userId = payload.split('__')[0];

    const doctor = await Doctor.findOne({ _id: userId })

    if (!doctor) return res.json({ status: 'failure', message: 'Doctor not found, with given id!' })

    // this is the public key that was saved 
    // console.log(doctor);
    const publicKey = doctor.key;

    // console.log(publicKey);

    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(payload);

    const isVerified = verifier.verify(
        `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`,
        signature,
        'base64',
    );

    if (!isVerified) {
        return res.json({
            status: 'failed',
            message: 'Unfortunetely we could not verify your Face ID authentication',
        });
    }

    const token = jwt.sign({ userId: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    return res.json({
        status: 'success', doctor, token
    });
}

module.exports.addPrescription = async (req, res) => {
    const patientId = req.params._id;
    const doctorId = req.user._id;
    const body = JSON.parse(req.body.details);
    const { name, quantity, startDate, endDate, slot} = body;
    const medicinePhotoData = fs.readFileSync(req.file.path);
    const prescription = new Prescription({
        patient: new ObjectId(patientId),
        image: medicinePhotoData,
        medicine: name,
        quantity: quantity,
        start_date: startDate,
        end_date: endDate
    });
    await prescription.save();
    res.send({status: 'success'});
};
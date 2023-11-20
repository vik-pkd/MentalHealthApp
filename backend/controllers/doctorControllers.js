const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const ObjectId = require('mongoose').Types.ObjectId;

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

        const doctor = Doctor({ name, email, password, age })
        await doctor.save();
        res.send({ status: 'success' });
    } catch (error) {
        res.send(`Error occured while adding doctor ${error}`);
    }
}
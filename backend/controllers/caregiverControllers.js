const Caregiver = require('../models/caregiver')
const jwt = require('jsonwebtoken');
const Prescription = require('../models/prescription');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getCaregivers = async (req, res) => {

    // console.log('In here!')
    try {
        const caregivers = await Caregiver.find({});
        res.send(caregivers);
    } catch (err) {
        res.send(err);
    }
}

module.exports.addCaregiver = async (req, res) => {

    const { name, email, password, age } = req.body;

    try {
        const isNewUser = await Caregiver.isThisEmailInUse(email);
        if (!isNewUser) {
            return res.send({ status: 'failure', message: 'This email is already in use, try to sign-in' })
        }

        const caregiver = Caregiver({ name, email, password, age })
        await caregiver.save();
        res.send({ status: 'success' });
    } catch (error) {
        res.send(`Error occured while adding caregiver ${error}`);
    }
}

module.exports.caregiverSignIn = async (req, res) => {
    const { email, password } = req.body;
    const caregiver = await Caregiver.findOne({ email })

    if (!caregiver) return res.json({ status: 'failure', message: 'Caregiver not found, with given email!' })

    const isMatch = await caregiver.comparePassword(password);
    if (!isMatch) return res.json({ status: 'failure', message: 'email / password does not match!' })

    const token = jwt.sign({ userId: caregiver._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.send({ status: 'success', caregiver, token })
}

module.exports.getPatientsCaregiver = async (req, res) => {
    console.log('Inside get patients for caregiver!')
    console.log(req.body)

    const caregiverid = new ObjectId(req.body.caregiverid);
    console.log(caregiverid)
    const patients = (await Caregiver.findById(caregiverid).populate('patients')).patients;
    res.send(patients);

}

module.exports.checkPrescription = async (req, res) => {
    const patientId = req.params._id;

    // TODO : Get the patient and check if he / she took the dosage (daily ?)


}
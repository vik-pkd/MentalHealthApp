const Caregiver = require('../models/caregiver')
const jwt = require('jsonwebtoken');
const Prescription = require('../models/prescription');
const Alert = require('../models/alert');
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

    const token = jwt.sign({ userId: caregiver._id, role: 'caregiver' }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.send({ status: 'success', caregiver, token })
}

module.exports.getPatientsCaregiver = async (req, res) => {
    console.log('Inside get patients for caregiver!')
    console.log(req.body)

    const caregiverid = new ObjectId(req.body.caregiverid);
    console.log(caregiverid)
    const patients = (await Caregiver.findById(caregiverid).populate('patients')).patients;



    const reminder_list = []
    for (let i = 0; i < patients.length; i++) {
        const patientId = patients[i]._id;
        console.log('reminders fetching...', patientId);
        const current_date = new Date();

        const condition1 = { patient: patientId };
        const condition2 = { start_date: { $lte: current_date } };
        const condition3 = { end_date: { $gt: current_date } };
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
                    time: doseTime,
                    doseIndex: j
                });
            }
        }
        reminders.sort((a, b) => a.time.getTime() - b.time.getTime());
        reminder_list.push(reminders)
    }
    console.log(reminder_list)
    res.send({ status: "success", patients: patients, reminders: reminder_list });
}

module.exports.addIssueAlert = async (req, res) => {
    console.log('Inside Issue Alert!');
    try {
        const prescriptionid = new ObjectId(req.body.prescriptionId);
        const patientid = new ObjectId(req.body.patientId);
        const caregiverid = new ObjectId(req.body.caregiverId);

        const alert = new Alert({
            patient: patientid,
            caregiver: caregiverid,
            prescription: prescriptionid
        });
        await alert.save();
        res.send({ status: 'success' });
    }
    catch (error) {
        res.send({ status: 'failure' });
    }
}

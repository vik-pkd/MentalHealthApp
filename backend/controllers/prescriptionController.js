const Prescription = require('../models/prescription');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.AddPrescription = async (req, res) => {
    try {
        console.log('req', req.body);
        console.log(req.body.slots);

        const doctor = '652591304ae9e13d68002868';
        const prescription = new Prescription({
            "doctor": new ObjectId(doctor),
            "patient": new ObjectId(req.body.patient),
            "medicine": req.body.medicine,
            "start_date": new Date(req.body.start_date),
            "end_date": new Date(req.body.end_date),
            "slots": req.body.slots,
        });
        console.log(prescription);
        await prescription.save();
        res.send(prescription);
    } catch (error) {
        console.log(error);
    }
};

module.exports.GetReminders = async (req, res) => {
    console.log(req.params.patient);
    const prescriptions = await Prescription.find({patient: new ObjectId(req.params.patient)});
    console.log(prescriptions);
    const reminders = [];
    prescriptions.forEach(item => {
        for (let i = new Date(item.start_date); i <= item.end_date; i.setDate(i.getDate() + 1)) {
            item.slots.forEach(slot => {
                reminders.push({
                    "medicine": item.medicine,
                    "date": new Date(i),
                    "slot": slot.slot_name,
                    "isBeforeFood": slot.isBeforeFood
                });
            });
        }
    });
    res.send(reminders.slice(0, 5));
}
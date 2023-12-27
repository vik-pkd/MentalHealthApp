const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    medicine: {
        type: String
    },
    prescription_date: {
        type: String
    },
    start_date: {
        type: Date
    },
    start_slot: {
        type: String
    },
    end_date: {
        type: Date
    },
    end_slot: {
        type: String
    },
});

module.exports = mongoose.model("Prescription", userSchema);
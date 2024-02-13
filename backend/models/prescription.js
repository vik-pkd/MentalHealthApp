const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    medicine: {
        type: String
    },
    image: {
        type: Buffer
    },
    quantity: {
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

module.exports = mongoose.model("Prescription", prescriptionSchema);
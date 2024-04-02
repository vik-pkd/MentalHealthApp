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
    end_date: {
        type: Date
    },
    foodTiming: {
        type: String,
    },
    doseTimings: [{
        type: Date,
    }]
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
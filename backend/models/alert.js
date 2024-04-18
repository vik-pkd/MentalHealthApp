const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    caregiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Caregiver'
    },
    prescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription'
    }
});

module.exports = mongoose.model("Alert", alertSchema);
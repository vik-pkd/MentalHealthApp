const mongoose = require("mongoose");

const doseHistorySchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    prescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription'
    },
    date: {
        type: Date
    },
    time: {
        type: Date,
    },
    slot: {
        type: Number,
    },
    istaken: {
        type: Boolean
    },
    edited: {
        type: Boolean
    }
});

module.exports = mongoose.model("DoseHistory", doseHistorySchema);
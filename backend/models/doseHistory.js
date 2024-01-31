const mongoose = require("mongoose");

const doseHistorySchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    medicine: {
        type: String
    },
    date: {
        type: Date
    },
    slot: {
        type: String,
    },
    istaken: {
        type: Boolean
    }
});

module.exports = mongoose.model("DoseHistory", userSchema);
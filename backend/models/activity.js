const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    points: {
        type: Number
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
});

module.exports = mongoose.model("Activity", activitySchema);
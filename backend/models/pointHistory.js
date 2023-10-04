const mongoose = require("mongoose");

const pointHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date
    },
    date: {
        type: String
    },
    taskType: {
        type: String
    }
});

module.exports = mongoose.model("PointHistory", userSchema);
const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    name: {
        type: String
    },
    image: {
        type: Buffer
    },
    foodTiming: {
        type: String
    }
});

module.exports = mongoose.model("Medicine", medicineSchema);
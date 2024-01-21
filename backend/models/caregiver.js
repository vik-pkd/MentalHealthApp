const mongoose = require("mongoose");

const caregiverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    patient:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient' 
    }
});

module.exports = mongoose.model('Caregiver', caregiverSchema);
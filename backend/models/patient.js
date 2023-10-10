const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
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
    Score: {
        type: Number
    },
    Streak: {
        type: Number
    },
    caregivers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }
    ],
    doctors: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }
    ]
});

module.exports = mongoose.model('Patient', patientSchema);
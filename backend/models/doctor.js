const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
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
    patients: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }
    ]
});

module.exports = mongoose.model('Doctor', doctorSchema);
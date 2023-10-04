const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    userType: {
        type: String
    },
    Score: {
        type: Number
    },
    Streak: {
        type: Number
    },
    doctors: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    patients: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }
    ],
    caretakers: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
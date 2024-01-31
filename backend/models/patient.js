const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    caregiver:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Caregiver'
    },
    doctor:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
});

patientSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        })
    } else {
        next();
    }
});

patientSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('Invalid email!')
    try {
        const user = await this.findOne({ email: email })
        if (user) return false;
        return true;
    } catch (error) {
        console.log(error.message)
        return false;
    }
}

module.exports = mongoose.model('Patient', patientSchema);
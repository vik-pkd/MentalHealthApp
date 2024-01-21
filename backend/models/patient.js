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
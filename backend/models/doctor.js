const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

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
    key: {
        type: String
    },
    age: {
        type: Number
    },
    patients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        }
    ]
});

doctorSchema.pre('save', function (next) {
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

doctorSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('Password is missing, can not compare!');

    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log('Error while comparing password!', error.message);
    }
}

doctorSchema.statics.isThisEmailInUse = async function (email) {
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

doctorSchema.methods.addPatient = async function (patientId) {
    try {
        const id = patientId;
        this.patients.push(id);
        console.log('in doctor model', patientId);
        await this.save();
        console.log('in doctor model after', patientId);
    } catch (error) {
        console.log(error.message);
    }
    return;
}

module.exports = mongoose.model('Doctor', doctorSchema);
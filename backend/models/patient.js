const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ObjectId = require('mongoose').Types.ObjectId;

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
    face: {
        type: Array
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
    },
    games: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        }
    ]
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

patientSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('Password is missing, can not compare!');

    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log('Error while comparing password!', error.message);
    }
}

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

patientSchema.methods.addGames = async function (gameIds) {
    try {
        // gameIds: string[]
        console.log('gameIds', gameIds);
        for (const gameId of gameIds) {
            console.log('gameId', gameId);
            const id = new ObjectId(gameId);
            if (!this.games.includes(id)) {
                this.games.push(id);
            }
        }
        await this.save();
    } catch (error) {
        console.log(error.message);
    }
    return;
}

module.exports = mongoose.model('Patient', patientSchema);
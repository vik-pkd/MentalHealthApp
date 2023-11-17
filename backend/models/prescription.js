const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    medicine: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    slots: [
        {
            slot_name: {
                type: String,       
            },
            slot_time: {
                type: String
            },
            isBeforeFood: {
                type: Boolean
            }
        }
    ],
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
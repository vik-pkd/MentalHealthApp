const mongoose = require("mongoose");

// TODO : Change this to binary files
const gameCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
});

module.exports = mongoose.model('GameCategory', gameCategorySchema);
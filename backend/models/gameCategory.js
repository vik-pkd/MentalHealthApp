const mongoose = require("mongoose");

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
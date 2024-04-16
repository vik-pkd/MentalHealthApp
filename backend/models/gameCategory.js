const mongoose = require("mongoose");

const gameCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
});

module.exports = mongoose.model('GameCategory', gameCategorySchema);
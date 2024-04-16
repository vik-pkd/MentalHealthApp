const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameCategory'
    },
    htmlContent: {
        type: String,
        required: true
    },
    cssContent: {
        type: String,
    },
    javascriptContent: {
        type: String,
    }
});

module.exports = mongoose.model('Game', gameSchema);
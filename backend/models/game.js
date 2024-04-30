const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model("Game", gameSchema);
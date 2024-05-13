const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
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

gameSchema.statics.isThisTitleInUse = async function (title) {
    if (!title) {
        throw new Error('Invalid Game Title!');
        return;
    }
    try {
        const game = await this.findOne({ title: title })
        if (game) return false;
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

module.exports = mongoose.model('Game', gameSchema);
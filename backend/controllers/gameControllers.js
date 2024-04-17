const fs = require('fs');
const unzipper = require('unzipper');

const Game = require("../models/game");
const gameCategory = require("../models/gameCategory");
const GameCategory = require("../models/gameCategory");
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getGame = async (req, res) => {
    console.log('req.params', req.params);
    try {
        // TODO fix error in req.user._id
        // const patientId = req.user._id;
        const gameId = new ObjectId(req.params._id);
        const game = await Game.findOne({ _id: gameId });
        res.send({ status: "success", game: game });
    } catch (error) {
        console.log(error);
        res.send({ status: "failure", "message": "Could not send game" });
    }
};

module.exports.addGameCategory = async (req, res) => {
    try {
        // TODO user
        const { name, description } = req.body;
        const gameCategory = new GameCategory({ name, description });
        await gameCategory.save();
        res.send({ status: "success" });
    } catch (error) {
        res.send({ status: "failure" });
    }
};

module.exports.getGameCategories = async (req, res) => {
    try {
        const gameCategories = await GameCategory.find({});
        res.send({ status: "success", gameCategories: gameCategories });
    } catch (error) {
        res.send({ status: "failure" });
    }
};

module.exports.getAllGameNames = async (req, res) => {
    try {
        const GameNameObj = await Game.aggregate([
            {
                $project: {
                    name: true,
                    _id: false
                }
            }
        ]);
        const gameNames = GameNameObj.map(game => game.name);
        res.send({ status: "success", gameNames: gameNames });
    } catch (error) {
        res.send({ status: "failure" });
    }
}

module.exports.getAllCategoriesNames = async (req, res) => {
    try {

        const gameCategories = await GameCategory.aggregate([
            {
                $project: {
                    title: true,
                    _id: false
                }
            }
        ]);
        const gameCategoriesName = gameCategories.map(category => category.title);
        res.send({ status: "success", gameCategoriesName: gameCategoriesName });
    } catch (error) {
        res.send({ status: "failure" });
    }
}

module.exports.getGamesOfCategory = async (req, res) => {
    try {
        const gameCategoryId = req.params.gameCategroy;
        console.log('gameCategoryId', gameCategoryId);
        const games = await Game.find({ category: new ObjectId(gameCategoryId) });
        console.log('games', games);
        res.send({ status: "success", games: games });
    } catch (error) {
        console.log(error);
        res.send({ status: "failure" });
    }
};

async function processZip(zipFile) {
    // Use a library like unzipper to extract files from the zip
    // Here's a simple example using unzipper
    console.log('typeof zipPath.path', typeof zipFile.path);
    console.log('zipPath.path', zipFile.path);
    unzipper.Open.file(zipFile)
        .then(async (d) => {
            console.log('d', d);
            for (const entry of d.files) {
                console.log('Extracting:', entry.path);
                await entry.buffer(); // Do something with the file content
            }
        });
}

module.exports.uploadGame = async (req, res) => {
    try {
        const { htmlContent, cssContent, javascriptContent, name, description, category } = req.body;
        const isNewTitle = await Game.isThisTitleInUse(name);
        if (!isNewTitle) {
            return res.send({ status: 'failure', message: 'This title is already in use'});
        };
        const game = new Game({
            title: name,
            description,
            htmlContent,
            cssContent,
            javascriptContent,
            category: new ObjectId(category)
        });
        await game.save();
        res.send({ status: "success" });
    } catch (error) {
        console.log(error);
        res.send({ status: "failure" });
    }
    // const gameZipFile = fs.readFileSync(req.file.path);
    // console.log('gameZipFile', gameZipFile);
};
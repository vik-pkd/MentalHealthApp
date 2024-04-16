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
        const games = await Game.find({category: new ObjectId(gameCategoryId)});
        console.log('games', games);
        res.send({ status: "success", games: games });
    } catch (error) {
        console.log(error);
        res.send({ status: "failure" });
    }
};
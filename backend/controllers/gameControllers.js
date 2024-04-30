const fs = require('fs');
const unzipper = require('unzipper');

const Game = require("../models/game");
const gameCategory = require("../models/gameCategory");
const GameCategory = require("../models/gameCategory");
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getGame = async (req, res) => {
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

module.exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.find({}).populate('category');
        console.log('games', games);
        const gameList = games.map(game => ({
                _id: game._id,
                title: game.title,
                description: game.description,
                category: game.category.title,
            }));
        console.log('gameList', gameList);
        
        res.send({ status: "success", games: gameList });
    } catch (error) {
        console.log(error);
        res.send({ status: "failure", "message": "Could not send game" });
    }
};

module.exports.addGameCategory = async (req, res) => {
    try {
        // TODO user
        const { title, description } = req.body;
        console.log(title, description);
        const gameCategory = new GameCategory({ title, description });
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

module.exports.uploadGame = async (req, res) => {
    try {
        const { htmlContent, cssContent, javascriptContent, title, description, category } = req.body;
        const isNewTitle = await Game.isThisTitleInUse(title);
        if (!isNewTitle) {
            return res.send({ status: 'failure', message: 'This title is already in use'});
        };
        const game = new Game({
            title: title,
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
};
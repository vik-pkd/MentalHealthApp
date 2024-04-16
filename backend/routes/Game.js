const express = require('express');

const gameControllers = require('../controllers/gameControllers');

const router = express.Router();

router.get('/game/:_id', gameControllers.getGame);

router.post('/add-game-category', gameControllers.addGameCategory);

router.get('/game-categories', gameControllers.getGameCategories);

router.get('/game-names', gameControllers.getAllGameNames);

router.get('/gameCategory-names', gameControllers.getAllCategoriesNames);

router.get('/gameCategroy/:gameCategroy', gameControllers.getGamesOfCategory);

module.exports = router;
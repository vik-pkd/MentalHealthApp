const express = require('express');

const gameControllers = require('../controllers/gameControllers');
const upload = require('../utils/multer');

const router = express.Router();

router.get('/all-games', gameControllers.getAllGames);

router.get('/game/:_id', gameControllers.getGame);

router.post('/add-game-category', gameControllers.addGameCategory);

router.get('/game-categories', gameControllers.getGameCategories);

router.get('/gameCategroy/:gameCategroy', gameControllers.getGamesOfCategory);

router.post('/upload-game', gameControllers.uploadGame);

module.exports = router;
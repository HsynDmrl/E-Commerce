const express = require('express');
const router = express.Router();

const favoriteController = require('../controllers/favoriteController');

router.post('/add', favoriteController.addFavorite);
router.post('/remove', favoriteController.removeFavorite);
router.get('/user/:userId', favoriteController.getFavoritesByUser);
router.get('/getall', favoriteController.getAllFavorites);

module.exports = router;
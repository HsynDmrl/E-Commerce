const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/change-password', userController.changePassword);
router.post('/register', userController.registerUser);
router.get('/', userController.getUsers);

module.exports = router;

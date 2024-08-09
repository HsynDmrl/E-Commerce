const express = require('express');
const router = express.Router();

const historyController = require('../controllers/historyController');

router.get('/generate/:userId', historyController.generateHistoryCSV);
router.get('/get/:userId', historyController.getPurchaseHistoryByUser);


module.exports = router;

const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

router.post('/complete/:userId', purchaseController.completePurchase);

module.exports = router;


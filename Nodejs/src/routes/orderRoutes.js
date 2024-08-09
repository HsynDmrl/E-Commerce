const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.get('/list/:userId', orderController.getOrderList);
router.get('/listdetail/:orderId', orderController.getOrderDetailList);

module.exports = router;

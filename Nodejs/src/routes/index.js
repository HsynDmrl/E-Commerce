const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const basketRoutes = require('./basketRoutes');
const favoriteRoutes = require('./favoriteRoutes');
const purchaseRoutes = require('./purchaseRoutes');
const orderRoutes = require('./orderRoutes');
const historyRoutes = require('./historyRoutes');

router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes);
router.use('/basket', basketRoutes);
router.use('/favorite', favoriteRoutes);
router.use('/purchase', purchaseRoutes);
router.use('/order', orderRoutes);
router.use('/history', historyRoutes);

module.exports = router;

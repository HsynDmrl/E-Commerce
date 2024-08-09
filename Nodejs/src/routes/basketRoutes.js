const express = require('express');
const router = express.Router();
const basketController = require('../controllers/basketController');

// Sepete ürün ekleme endpoint'i
router.post('/add', basketController.addBasketItem);
// Kullanıcının sepetindeki ürünleri alma endpoint'i
router.get('/get/:userId', basketController.getBasketItems);
// Sepetteki ürün miktarını azaltma endpoint'i
router.put('/decrease/:basketItemId', basketController.decreaseItemQuantity);
// Sepetteki ürün miktarını artırma endpoint'i
router.put('/increase/:basketItemId', basketController.increaseItemQuantity);
// Sepetten ürün silme endpoint'i
router.delete('/delete/:basketItemId', basketController.deleteBasketItem);
// Kullanıcının sepetini temizleme endpoint'i
router.delete('/clear/:userId', basketController.clearBasket);

module.exports = router;

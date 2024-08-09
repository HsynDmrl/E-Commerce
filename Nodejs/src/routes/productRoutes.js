const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/getall', productController.getAllProducts);
router.get('/getbyid/:productId', productController.getProductById);
router.post('/add', productController.addProduct);
router.put('/update/:productId', productController.updateProduct);
router.delete('/delete/:productId', productController.deleteProduct);
router.get('/exists_by_id/:productId', productController.existsById);
router.post('/filter_and_sort', productController.filterAndSort);
router.get('/get_product_price/:productId', productController.getProductPrice);

module.exports = router;
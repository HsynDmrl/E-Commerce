const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/getall', categoryController.getAllCategories);
router.get('/getbyid/:categoryId', categoryController.getCategoryById);
router.post('/add', categoryController.addCategory);
router.put('/update/:categoryId', categoryController.updateCategory);
router.delete('/delete/:categoryId', categoryController.deleteCategory);

module.exports = router;

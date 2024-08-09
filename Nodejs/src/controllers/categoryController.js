const categoryModel = require('../models/categoryModel.js');

// Yeni bir kategori ekler.
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kategori adını ve üst kategori ID'sini kullanarak yeni bir kategori ekler.
const addCategory = async (req, res) => {
    const { categoryName, parentCategoryId } = req.body; // İstek gövdesinden kategori adı ve üst kategori ID'sini alır
    try {
        const response = await categoryModel.addCategory(categoryName, parentCategoryId); // Model fonksiyonunu çağırarak yeni kategori ekler
        res.status(201).json(response); 
    } catch (error) {
        res.status(500).json(error);
    }
};

// Tüm kategorileri getirir.
// Bu fonksiyon, gelen HTTP isteğiyle tüm kategorileri getirir.
const getAllCategories = async (req, res) => {
    try {
        const response = await categoryModel.getAllCategories(); // Model fonksiyonunu çağırarak tüm kategorileri alır
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Belirli bir kategori ID'sine sahip kategoriyi getirir.
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kategori ID'sine sahip kategoriyi getirir.
const getCategoryById = async (req, res) => {
    const categoryId = req.params.categoryId; // İstek parametrelerinden kategori ID'sini alır
    try {
        const response = await categoryModel.getCategoryById(categoryId); // Model fonksiyonunu çağırarak belirtilen kategori ID'sine sahip kategoriyi alır
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Kategoriyi günceller.
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kategori ID'sine sahip kategoriyi günceller.
const updateCategory = async (req, res) => {
    const categoryId = req.params.categoryId; // İstek parametrelerinden kategori ID'sini alır
    const { categoryName, parentCategoryId } = req.body; // İstek gövdesinden kategori adı ve üst kategori ID'sini alır
    try {
        const response = await categoryModel.updateCategory(categoryId, categoryName, parentCategoryId); // Model fonksiyonunu çağırarak belirtilen kategori ID'sine sahip kategoriyi günceller
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error);
    }
};

// Kategoriyi siler.
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kategori ID'sine sahip kategoriyi siler.
const deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryId; // İstek parametrelerinden kategori ID'sini alır
    try {
        const response = await categoryModel.deleteCategory(categoryId); // Model fonksiyonunu çağırarak belirtilen kategori ID'sine sahip kategoriyi siler
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};

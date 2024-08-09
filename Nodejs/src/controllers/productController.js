const productModel = require('../models/productModel');

// Yeni bir ürün ekleme işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen ürün adını, kategori ID'sini ve fiyatı kullanarak yeni bir ürün ekler.
const addProduct = async (req, res) => {
    const { productName, categoryId, price } = req.body; // İstek gövdesinden ürün adı, kategori ID'si ve fiyatı alır
    try {
        const response = await productModel.addProduct(productName, categoryId, price); // Model fonksiyonunu çağırarak yeni ürün ekler
        res.status(201).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Tüm ürünleri alma işlemi
// Bu fonksiyon, gelen HTTP isteğiyle tüm ürünleri getirir.
const getAllProducts = async (req, res) => {
    try {
        const response = await productModel.getAllProducts(); // Model fonksiyonunu çağırarak tüm ürünleri alır
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error);
    }
};

// Belirli bir ürün ID'sine sahip ürünü alma işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen ürün ID'sine sahip ürünü getirir.
const getProductById = async (req, res) => {
    const productId = req.params.productId; // İstek parametrelerinden ürün ID'sini alır
    try {
        const response = await productModel.getProductById(productId); // Model fonksiyonunu çağırarak belirtilen ürün ID'sine sahip ürünü alır
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Ürün güncelleme işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen ürün ID'sine sahip ürünü günceller.
const updateProduct = async (req, res) => {
    const productId = req.params.productId; // İstek parametrelerinden ürün ID'sini alır
    const { productName, categoryId, price } = req.body; // İstek gövdesinden ürün adı, kategori ID'si ve fiyatı alır
    try {
        const response = await productModel.updateProduct(productId, productName, categoryId, price); // Model fonksiyonunu çağırarak ürünü günceller
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Ürün silme işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen ürün ID'sine sahip ürünü siler.
const deleteProduct = async (req, res) => {
    const productId = req.params.productId; // İstek parametrelerinden ürün ID'sini alır
    try {
        const response = await productModel.deleteProduct(productId); // Model fonksiyonunu çağırarak ürünü siler
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Belirli bir ürün ID'sine sahip ürünün var olup olmadığını kontrol etme işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen ürün ID'sine sahip ürünün var olup olmadığını kontrol eder.
const existsById = async (req, res) => {
    const productId = req.params.productId; // İstek parametrelerinden ürün ID'sini alır
    try {
        const response = await productModel.existsById(productId); // Model fonksiyonunu çağırarak ürünün var olup olmadığını kontrol eder
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Ürünleri filtreleme ve sıralama işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kriterlere göre ürünleri filtreler ve sıralar.
const filterAndSort = async (req, res) => {
    try {
        const { categoryId, minPrice, maxPrice, sortOrder, favoriteOrder } = req.body; // İstek gövdesinden filtre ve sıralama kriterlerini alır
        const response = await productModel.filterAndSort(categoryId, minPrice, maxPrice, sortOrder, favoriteOrder); // Model fonksiyonunu çağırarak ürünleri filtreler ve sıralar
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Belirli bir ürünün fiyatını alma işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen ürün ID'sine sahip ürünün fiyatını getirir.
const getProductPrice = async (req, res) => {
    const productId = parseInt(req.params.productId); // İstek parametrelerinden ürün ID'sini alır ve numaraya dönüştürür
    try {
        const response = await productModel.getProductPrice(productId); // Model fonksiyonunu çağırarak ürünün fiyatını alır
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    existsById,
    filterAndSort,
    getProductPrice,
};

const favoriteModel = require('../models/favoriteModel');

// Favorilere ürün ekleme işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kullanıcı ID'si ve ürün ID'si kullanarak favorilere yeni bir ürün ekler.
const addFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body; // İstek gövdesinden kullanıcı ID'si ve ürün ID'sini alır
        const response = await favoriteModel.addFavorite(userId, productId); // Model fonksiyonunu çağırarak favorilere yeni ürün ekler
        res.status(201).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Favorilerden ürün çıkarma işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kullanıcı ID'si ve ürün ID'si kullanarak favorilerden bir ürünü çıkarır.
const removeFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body; // İstek gövdesinden kullanıcı ID'si ve ürün ID'sini alır
        const response = await favoriteModel.removeFavorite(userId, productId); // Model fonksiyonunu çağırarak favorilerden ürünü çıkarır
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Kullanıcının favorilerini alma işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kullanıcı ID'si kullanarak kullanıcının tüm favori ürünlerini getirir.
const getFavoritesByUser = async (req, res) => {
    try {
        const { userId } = req.params; // İstek parametrelerinden kullanıcı ID'sini alır
        const response = await favoriteModel.getFavoritesByUser(userId); // Model fonksiyonunu çağırarak kullanıcının favori ürünlerini alır
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Tüm favorileri alma işlemi
// Bu fonksiyon, gelen HTTP isteğiyle tüm kullanıcıların favori ürünlerini getirir.
const getAllFavorites = async (req, res) => {
    try {
        const response = await favoriteModel.getAllFavorites(); // Model fonksiyonunu çağırarak tüm kullanıcıların favori ürünlerini alır
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

module.exports = {
    addFavorite,
    removeFavorite,
    getFavoritesByUser,
    getAllFavorites,
};

const basketModel = require('../models/basketModel');

// Sepete ürün ekleme işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kullanıcı ID'si, ürün ID'si ve miktarı kullanarak sepetine yeni bir ürün ekler.
const addBasketItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body; // İstek gövdesinden kullanıcı ID'si, ürün ID'si ve miktarı alır
        const response = await basketModel.addBasketItem(userId, productId, quantity); // Model fonksiyonunu çağırarak sepetine yeni ürün ekler
        res.status(201).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Kullanıcının sepetindeki ürünleri alma işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kullanıcı ID'si kullanarak kullanıcının sepetindeki tüm ürünleri getirir.
const getBasketItems = async (req, res) => {
    try {
        const userId = req.params.userId; // İstek parametrelerinden kullanıcı ID'sini alır
        const response = await basketModel.getBasketItems(userId); // Model fonksiyonunu çağırarak kullanıcının sepetindeki ürünleri alır
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Sepetteki ürün miktarını azaltma işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen sepet ürünü ID'si kullanarak sepet ürününün miktarını azaltır.
const decreaseItemQuantity = async (req, res) => {
    try {
        const { basketItemId } = req.params; // İstek parametrelerinden sepet ürünü ID'sini alır
        const response = await basketModel.decreaseItemQuantity(basketItemId); // Model fonksiyonunu çağırarak sepet ürününün miktarını azaltır
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Sepetteki ürün miktarını artırma işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen sepet ürünü ID'si kullanarak sepet ürününün miktarını artırır.
const increaseItemQuantity = async (req, res) => {
    try {
        const { basketItemId } = req.params; // İstek parametrelerinden sepet ürünü ID'sini alır
        const response = await basketModel.increaseItemQuantity(basketItemId); // Model fonksiyonunu çağırarak sepet ürününün miktarını artırır
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Sepetten ürün silme işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen sepet ürünü ID'si kullanarak sepet ürününü siler.
const deleteBasketItem = async (req, res) => {
    try {
        const { basketItemId } = req.params; // İstek parametrelerinden sepet ürünü ID'sini alır
        const response = await basketModel.deleteBasketItem(basketItemId); // Model fonksiyonunu çağırarak sepet ürününü siler
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Kullanıcının sepetini temizleme işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kullanıcı ID'si kullanarak kullanıcının sepetindeki tüm ürünleri temizler.
const clearBasket = async (req, res) => {
    try {
        const userId = req.params.userId; // İstek parametrelerinden kullanıcı ID'sini alır
        const response = await basketModel.clearBasket(userId); // Model fonksiyonunu çağırarak kullanıcının sepetindeki ürünleri temizler
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

module.exports = {
    addBasketItem,
    getBasketItems,
    decreaseItemQuantity,
    increaseItemQuantity,
    deleteBasketItem,
    clearBasket,
};

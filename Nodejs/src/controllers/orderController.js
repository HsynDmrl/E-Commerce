const orderModel = require('../models/orderModel');

// Kullanıcının sipariş listesini getirir.
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kullanıcı ID'si kullanarak kullanıcının tüm siparişlerini getirir.
const getOrderList = async (req, res) => {
    const userId = req.params.userId; // İstek parametrelerinden kullanıcı ID'sini alır
    try {
        const response = await orderModel.getOrderList(userId); // Model fonksiyonunu çağırarak kullanıcının tüm siparişlerini alır
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Belirli bir siparişin detaylarını getirir.
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen sipariş ID'si kullanarak belirli bir siparişin tüm detaylarını getirir.
const getOrderDetailList = async (req, res) => {
    const orderId = req.params.orderId; // İstek parametrelerinden sipariş ID'sini alır
    try {
        const response = await orderModel.getOrderDetailList(orderId); // Model fonksiyonunu çağırarak belirli bir siparişin tüm detaylarını alır
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Fonksiyonları dışa aktarır ve kullanılabilir hale getirir.
module.exports = {
    getOrderList,
    getOrderDetailList,
};

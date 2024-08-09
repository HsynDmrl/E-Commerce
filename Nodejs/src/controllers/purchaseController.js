const purchaseModel = require('../models/purchaseModel');

// Satın alma işlemini tamamlama
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kullanıcı ID'si kullanarak satın alma işlemini tamamlar.
const completePurchase = async (req, res) => {
    const userId = req.params.userId; // İstek parametrelerinden kullanıcı ID'sini alır
    try {
        const response = await purchaseModel.completePurchase(userId); // Model fonksiyonunu çağırarak satın alma işlemini tamamlar
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    completePurchase
};

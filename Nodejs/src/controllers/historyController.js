const historyModel = require('../models/historyModel');

// Kullanıcı geçmişi CSV dosyasını oluşturur.
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kullanıcı ID'si kullanarak kullanıcı geçmişini CSV formatında oluşturur.
const generateHistoryCSV = async (req, res) => {
    try {
        const userId = req.params.userId; // İstek parametrelerinden kullanıcı ID'sini alır
        const response = await historyModel.generateHistoryCSV(userId); // Model fonksiyonunu çağırarak kullanıcı geçmişini CSV formatında oluşturur
        res.status(response.status === 'success' ? 200 : 500).json(response); 
    } catch (error) {
        res.status(500).json(error);
    }
};

// Kullanıcının satın alma geçmişini getirir.
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kullanıcı ID'si kullanarak kullanıcının satın alma geçmişini CSV formatında getirir.
const getPurchaseHistoryByUser = async (req, res) => {
    const userId = req.params.userId; // İstek parametrelerinden kullanıcı ID'sini alır
    try {
        const response = await historyModel.getPurchaseHistoryByUser(userId); // Model fonksiyonunu çağırarak kullanıcının satın alma geçmişini alır
        if (response.status === 'success') {
            res.header('Content-Type', 'text/csv'); // Yanıt başlığını CSV formatında ayarlar
            res.attachment(`purchase_history_${userId}.csv`); // Yanıtı dosya olarak iliştirir
            res.status(200).send(response.data); 
        } else {
            res.status(500).json(response); 
        }
    } catch (error) {
        res.status(500).json(error); 
    }
};

module.exports = {
    generateHistoryCSV,
    getPurchaseHistoryByUser
};

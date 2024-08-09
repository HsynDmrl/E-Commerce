const oracledb = require('oracledb');
const config = require('../config/config');

// Veritabanı bağlantısını alır.
// Bu fonksiyon, Oracle veritabanına bağlantı açar ve bağlantı nesnesini döner.
const getConnection = async () => {
    return await oracledb.getConnection(config.oracleDB);
};

// Veritabanı bağlantısını kapatır.
// Bu fonksiyon, verilen bağlantı nesnesini kapatır.
const closeConnection = async (connection) => {
    if (connection) {
        try {
            await connection.close();
        } catch (error) {
            console.error("Error closing connection:", error); // Bağlantı kapatılırken hata oluşursa konsola yazdırır
        }
    }
};

// İşlemi geri alır.
// Bu fonksiyon, verilen bağlantı nesnesi için işlemi geri alır.
const rollbackTransaction = async (connection) => {
    if (connection) {
        try {
            await connection.rollback();
        } catch (error) {
            console.error("Error rolling back transaction:", error); // İşlem geri alınırken hata oluşursa konsola yazdırır
        }
    }
};

// Fonksiyonları dışa aktarır ve kullanılabilir hale getirir.
module.exports = {
    getConnection,
    closeConnection,
    rollbackTransaction
};

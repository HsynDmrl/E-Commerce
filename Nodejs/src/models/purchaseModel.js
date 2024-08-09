const oracledb = require('oracledb'); 
const { getConnection, closeConnection, rollbackTransaction } = require('../utils/dbHelper');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/formatResponse');

// Satın alımı tamamlar.
// Bu fonksiyon, belirli bir kullanıcı için satın alım işlemini tamamlar.
const completePurchase = async (userId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak satın alım işlemini tamamlar ve işlemi bitirir.
        await connection.execute(
            `BEGIN purchase_pkg.complete_purchase(:p_user_id); COMMIT; END;`,
            {
                p_user_id: userId // Kullanıcı ID'si giriş parametresi olarak bağlanır
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Purchase completed successfully');
    } catch (error) {
        // Hata durumunda işlemi geri alır ve hata yanıtı döner.
        await rollbackTransaction(connection);
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Fonksiyonu dışa aktarır ve kullanılabilir hale getirir.
module.exports = {
    completePurchase
};

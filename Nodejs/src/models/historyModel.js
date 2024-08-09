const oracledb = require('oracledb'); 
const { getConnection, closeConnection, rollbackTransaction } = require('../utils/dbHelper');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/formatResponse');

// Kullanıcı geçmişi CSV dosyasını oluşturur.
// Bu fonksiyon, belirli bir kullanıcı için geçmişi CSV formatında oluşturur.
const generateHistoryCSV = async (userId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak kullanıcı geçmişini CSV olarak oluşturur ve işlemi tamamlar.
        await connection.execute(
            `BEGIN history_pkg.generate_history_csv(:user_id); COMMIT; END;`,
            { user_id: userId } // Kullanıcı ID'si giriş parametresi olarak bağlanır
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, "History CSV generated successfully");
    } catch (error) {
        // Hata durumunda işlemi geri alır ve hata yanıtı döner.
        await rollbackTransaction(connection);
        return formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Kullanıcının satın alma geçmişini getirir.
// Bu fonksiyon, belirli bir kullanıcının satın alma geçmişini CSV formatında getirir.
const getPurchaseHistoryByUser = async (userId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak kullanıcının satın alma geçmişini alır.
        const result = await connection.execute(
            `BEGIN
                :purchaseHistory := history_pkg.get_history_csv(:userId);
            END;`,
            {
                userId: userId, // Kullanıcı ID'si giriş parametresi olarak bağlanır
                purchaseHistory: { type: oracledb.CLOB, dir: oracledb.BIND_OUT } // Çıkış parametresi olarak CLOB tipi döner
            }
        );

        const lob = result.outBinds.purchaseHistory;

        if (lob === null) {
            throw new Error('No CSV content found for the specified user ID.');
        }

        let csvContent = '';

        // Promise döner ve CLOB içeriğini okur.
        return new Promise((resolve, reject) => {
            lob.setEncoding('utf8'); // Encoding ayarlanır, böylece Buffer yerine string alınır

            // CLOB içeriğini parça parça okur.
            lob.on('data', chunk => {
                csvContent += chunk;
            });

            // CLOB okuma işlemi bittiğinde çağrılır.
            lob.on('end', () => {
                closeConnection(connection);
                resolve(formatSuccessResponse(csvContent, "Purchase history fetched successfully"));
            });

            // CLOB okuma sırasında hata oluşursa çağrılır.
            lob.on('error', err => {
                closeConnection(connection);
                reject(formatErrorResponse(err));
            });
        });

    } catch (error) {
        console.error('Error in getPurchaseHistoryByUser:', error);
        await closeConnection(connection); // Ensure connection is closed even if there's an error
        return formatErrorResponse(error); // Hata durumunda hata yanıtı döner.
    }
};

// Fonksiyonları dışa aktarır ve kullanılabilir hale getirir.
module.exports = {
    generateHistoryCSV,
    getPurchaseHistoryByUser
};

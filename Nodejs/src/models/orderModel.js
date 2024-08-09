const oracledb = require('oracledb'); 
const { getConnection, closeConnection, rollbackTransaction } = require('../utils/dbHelper');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/formatResponse');

// Kullanıcının sipariş listesini getirir.
// Bu fonksiyon, belirli bir kullanıcının tüm siparişlerini getirir.
const getOrderList = async (userId) => {
    let connection;
    let resultSet;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak kullanıcının tüm siparişlerini alır.
        const result = await connection.execute(
            `BEGIN
                order_info_pkg.get_order_list(:userId, :orderList);
            END;`,
            {
                userId: userId, // Kullanıcı ID'si giriş parametresi olarak bağlanır
                orderList: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } // Çıkış parametresi olarak cursor döner
            },
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // Çıktı formatı nesne olarak ayarlanır
        );

        resultSet = result.outBinds.orderList; // Veritabanından dönen cursor
        const orders = [];

        let row;
        while ((row = await resultSet.getRow())) { // Cursor'dan her bir satırı alır
            orders.push({
                order_id: row.ORDER_ID, // Sipariş ID'si
                user_id: row.USER_ID, // Kullanıcı ID'si
                order_date: row.ORDER_DATE, // Sipariş tarihi
                total_amount: row.TOTAL_AMOUNT, // Toplam tutar
                user_name: row.USER_NAME // Kullanıcı adı
            });
        }

        await resultSet.close(); // Sonuç kümesini kapatır
        return formatSuccessResponse(orders, 'Order list retrieved successfully');
    } catch (error) {
        await rollbackTransaction(connection); // Hata durumunda işlemi geri alır
        throw formatErrorResponse(error); // Hata yanıtı döner
    } finally {
        await closeConnection(connection); // Bağlantıyı kapatır
    }
};

// Sipariş detay listesini getirir.
// Bu fonksiyon, belirli bir siparişin tüm detaylarını getirir.
const getOrderDetailList = async (orderId) => {
    let connection;
    let resultSet;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak belirli bir siparişin tüm detaylarını alır.
        const result = await connection.execute(
            `BEGIN
                order_info_pkg.get_order_detail_list(:p_order_id, :p_order_detail_list);
            END;`,
            {
                p_order_id: orderId, // Sipariş ID'si giriş parametresi olarak bağlanır
                p_order_detail_list: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } // Çıkış parametresi olarak cursor döner
            },
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // Çıktı formatı nesne olarak ayarlanır
        );

        resultSet = result.outBinds.p_order_detail_list; // Veritabanından dönen cursor
        const orderDetails = [];

        let row;
        while ((row = await resultSet.getRow())) { // Cursor'dan her bir satırı alır
            orderDetails.push({
                order_detail_id: row.ORDER_DETAIL_ID, // Sipariş detay ID'si
                order_id: row.ORDER_ID, // Sipariş ID'si
                product_id: row.PRODUCT_ID, // Ürün ID'si
                quantity: row.QUANTITY, // Miktar
                product_name: row.PRODUCT_NAME, // Ürün adı
                price: row.PRICE // Fiyat
            });
        }

        await resultSet.close(); // Sonuç kümesini kapatır
        return formatSuccessResponse(orderDetails, 'Order details retrieved successfully');
    } catch (error) {
        await rollbackTransaction(connection); // Hata durumunda işlemi geri alır
        throw formatErrorResponse(error); // Hata yanıtı döner
    } finally {
        await closeConnection(connection); // Bağlantıyı kapatır
    }
};

// Fonksiyonları dışa aktarır ve kullanılabilir hale getirir.
module.exports = {
    getOrderList,
    getOrderDetailList
};

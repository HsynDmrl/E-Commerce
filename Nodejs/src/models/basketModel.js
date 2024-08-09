const oracledb = require('oracledb'); 
const { getConnection, closeConnection, rollbackTransaction } = require('../utils/dbHelper');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/formatResponse');

// Sepete ürün ekler.
// Bu fonksiyon, belirli bir kullanıcı ve ürün için sepetine ürün ekler. Ürün miktarı belirtilir.
const addBasketItem = async (userId, productId, quantity) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak sepetine ürün ekler ve işlemi tamamlar.
        await connection.execute(
            `BEGIN basket_item_pkg.add_basket_item(:userId, :productId, :quantity); COMMIT; END;`,
            {
                userId: userId,
                productId: productId,
                quantity: quantity
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Basket item added successfully');
    } catch (error) {
        // Hata durumunda işlemi geri alır ve hata yanıtı döner.
        await rollbackTransaction(connection);
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Kullanıcının sepetindeki ürünleri getirir.
// Bu fonksiyon, belirli bir kullanıcının sepetindeki tüm ürünleri getirir.
const getBasketItems = async (userId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak kullanıcının sepetindeki ürünleri alır.
        const result = await connection.execute(
            `
            DECLARE
                l_basket_items basket_item_pkg.l_basket_item;
            BEGIN
                l_basket_items := basket_item_pkg.get_basket_items_by_user(:userId);
                OPEN :cursor FOR SELECT * FROM TABLE(l_basket_items);
            END;`,
            {
                userId: { val: userId, dir: oracledb.BIND_IN }, // userId değeri giriş parametresi olarak kullanılır
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } // cursor tipi ve yönü belirtilir
            }
        );

        // Sonuç kümesini işler ve sepet ürünlerini bir diziye dönüştürür.
        const resultSet = result.outBinds.cursor; // Veritabanından dönen cursor
        let rows = [];
        let row;
        while ((row = await resultSet.getRow())) { // Cursor'dan her bir satırı alır
            rows.push({
                basket_item_id: row[0],
                product_id: row[1],
                quantity: row[2],
                product_name: row[3],
                price: row[4]
            });
        }
        await resultSet.close(); // Sonuç kümesini kapatır
        return formatSuccessResponse(rows, 'Basket items retrieved successfully');
    } catch (error) {
        throw formatErrorResponse(error); // Hata durumunda hata yanıtı döner
    } finally {
        await closeConnection(connection); // Bağlantıyı kapatır
    }
};

// Sepetteki ürün miktarını azaltır.
// Bu fonksiyon, belirli bir sepet ürünü için miktarı bir azaltır.
const decreaseItemQuantity = async (basketItemId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak sepet ürününün miktarını azaltır ve işlemi tamamlar.
        await connection.execute(
            `BEGIN basket_item_pkg.decrease_item_quantity(:basketItemId); COMMIT; END;`,
            {
                basketItemId: basketItemId // Değişken direk olarak kullanılır, bind tipine gerek yok
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Item quantity decreased successfully');
    } catch (error) {
        // Hata durumunda işlemi geri alır ve hata yanıtı döner.
        await rollbackTransaction(connection);
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Sepetteki ürün miktarını artırır.
// Bu fonksiyon, belirli bir sepet ürünü için miktarı bir artırır.
const increaseItemQuantity = async (basketItemId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak sepet ürününün miktarını artırır ve işlemi tamamlar.
        await connection.execute(
            `BEGIN basket_item_pkg.increase_item_quantity(:basketItemId); COMMIT; END;`,
            {
                basketItemId: basketItemId // Değişken direk olarak kullanılır, bind tipine gerek yok
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Item quantity increased successfully');
    } catch (error) {
        // Hata durumunda işlemi geri alır ve hata yanıtı döner.
        await rollbackTransaction(connection);
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Sepetten bir ürünü siler.
// Bu fonksiyon, belirli bir sepet ürününü sepetten siler.
const deleteBasketItem = async (basketItemId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak sepet ürününü siler ve işlemi tamamlar.
        await connection.execute(
            `BEGIN basket_item_pkg.delete_basket_item(:basketItemId); COMMIT; END;`,
            {
                basketItemId: basketItemId // Değişken direk olarak kullanılır, bind tipine gerek yok
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Basket item deleted successfully');
    } catch (error) {
        // Hata durumunda işlemi geri alır ve hata yanıtı döner.
        await rollbackTransaction(connection);
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Kullanıcının sepetini temizler.
// Bu fonksiyon, belirli bir kullanıcının sepetindeki tüm ürünleri temizler.
const clearBasket = async (userId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak kullanıcının sepetini temizler ve işlemi tamamlar.
        await connection.execute(
            `BEGIN basket_pkg.delete_basket(:userId); COMMIT; END;`,
            {
                userId: userId // Değişken direk olarak kullanılır, bind tipine gerek yok
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Basket cleared successfully');
    } catch (error) {
        // Hata durumunda işlemi geri alır ve hata yanıtı döner.
        await rollbackTransaction(connection);
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Fonksiyonları dışa aktarır ve kullanılabilir hale getirir.
module.exports = {
    addBasketItem,
    getBasketItems,
    decreaseItemQuantity,
    increaseItemQuantity,
    deleteBasketItem,
    clearBasket,
};

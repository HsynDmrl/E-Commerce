const oracledb = require('oracledb'); 
const { getConnection, closeConnection, rollbackTransaction } = require('../utils/dbHelper');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/formatResponse');

// Favorilere ürün ekler.
// Bu fonksiyon, belirli bir kullanıcı ve ürün için favorilere ekler.
const addFavorite = async (userId, productId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak favorilere ürün ekler ve işlemi tamamlar.
        await connection.execute(
            `BEGIN favorite_pkg.add_favorite(:p_user_id, :p_product_id); COMMIT; END;`,
            {
                p_user_id: userId, // Kullanıcı ID'si giriş parametresi olarak bağlanır
                p_product_id: productId // Ürün ID'si giriş parametresi olarak bağlanır
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Favorite added successfully');
    } catch (error) {
        // Hata durumunda işlemi geri alır ve hata yanıtı döner.
        await rollbackTransaction(connection);
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Favorilerden ürün çıkarır.
// Bu fonksiyon, belirli bir kullanıcı ve ürün için favorilerden çıkarır.
const removeFavorite = async (userId, productId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak favorilerden ürünü çıkarır ve işlemi tamamlar.
        await connection.execute(
            `BEGIN favorite_pkg.remove_favorite(:p_user_id, :p_product_id); COMMIT; END;`,
            {
                p_user_id: userId, // Kullanıcı ID'si giriş parametresi olarak bağlanır
                p_product_id: productId // Ürün ID'si giriş parametresi olarak bağlanır
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Favorite removed successfully');
    } catch (error) {
        // Hata durumunda işlemi geri alır ve hata yanıtı döner.
        await rollbackTransaction(connection);
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Kullanıcının favorilerini getirir.
// Bu fonksiyon, belirli bir kullanıcının tüm favori ürünlerini getirir.
const getFavoritesByUser = async (userId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak kullanıcının tüm favori ürünlerini alır.
        const result = await connection.execute(
            `
            DECLARE
                l_favorites favorite_pkg.l_favorite;
            BEGIN
                favorite_pkg.get_favorites_by_user(p_user_id => :p_user_id, p_favorites => l_favorites);
                OPEN :p_favorites FOR SELECT * FROM TABLE(l_favorites);
            END;`,
            {
                p_user_id: { val: userId, dir: oracledb.BIND_IN }, // Kullanıcı ID'si giriş parametresi olarak kullanılır
                p_favorites: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } // Çıkış parametresi olarak cursor döner
            }
        );

        // Sonuç kümesini işler ve favori ürünleri bir diziye dönüştürür.
        const resultSet = result.outBinds.p_favorites; // Veritabanından dönen cursor
        let rows = [];
        let row;
        while ((row = await resultSet.getRow())) { // Cursor'dan her bir satırı alır
            rows.push({
                favorite_id: row[0],
                user_id: row[1],
                username: row[2],
                product_id: row[3],
                product_name: row[4],
                category_id: row[5],
                price: row[6],
                favorite_date: row[7]
            });
        }
        await resultSet.close(); // Sonuç kümesini kapatır
        return formatSuccessResponse(rows, 'Favorites retrieved successfully');
    } catch (error) {
        // Hata durumunda hata yanıtı döner.
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Tüm favorileri getirir.
// Bu fonksiyon, tüm kullanıcıların favori ürünlerini veritabanından getirir.
const getAllFavorites = async () => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak tüm kullanıcıların favori ürünlerini alır.
        const result = await connection.execute(
            `
            DECLARE
                l_favorites favorite_pkg.l_favorite;
            BEGIN
                favorite_pkg.get_all_favorites(p_favorites => l_favorites);
                OPEN :p_favorites FOR SELECT * FROM TABLE(l_favorites);
            END;`,
            {
                p_favorites: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } // Çıkış parametresi olarak cursor döner
            }
        );

        // Sonuç kümesini işler ve favori ürünleri bir diziye dönüştürür.
        const resultSet = result.outBinds.p_favorites; // Veritabanından dönen cursor
        let rows = [];
        let row;
        while ((row = await resultSet.getRow())) { // Cursor'dan her bir satırı alır
            rows.push({
                favorite_id: row[0],
                product_id: row[1],
                product_name: row[2],
                user_id: row[3],
                username: row[4],
                category_id: row[5],
                price: row[6],
                favorite_date: row[7]
            });
        }
        await resultSet.close(); // Sonuç kümesini kapatır
        return formatSuccessResponse(rows, 'Favorites retrieved successfully');
    } catch (error) {
        // Hata durumunda hata yanıtı döner.
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Fonksiyonları dışa aktarır ve kullanılabilir hale getirir.
module.exports = {
    addFavorite,
    removeFavorite,
    getFavoritesByUser,
    getAllFavorites
};

const oracledb = require('oracledb'); 
const { getConnection, closeConnection, rollbackTransaction } = require('../utils/dbHelper');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/formatResponse');

// Yeni bir kategori ekler.
// Bu fonksiyon, belirli bir kategori adı ve üst kategori ID'si ile yeni bir kategori ekler.
const addCategory = async (categoryName, parentCategoryId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak yeni bir kategori ekler ve işlemi tamamlar.
        await connection.execute(
            `BEGIN category_pkg.add_category(:categoryName, :parentCategoryId); COMMIT; END;`,
            {
                categoryName: categoryName, // Kategori adı giriş parametresi olarak bağlanır
                parentCategoryId: parentCategoryId // Üst kategori ID'si giriş parametresi olarak bağlanır
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Category added successfully');
    } catch (error) {
        // Hata durumunda işlemi geri alır ve hata yanıtı döner.
        await rollbackTransaction(connection);
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Tüm kategorileri getirir.
// Bu fonksiyon, tüm kategorileri veritabanından getirir.
const getAllCategories = async () => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak tüm kategorileri alır.
        const cursor = await connection.execute(
            `BEGIN OPEN :categories FOR SELECT category_id, category_name, parent_category_id FROM product_category; END;`,
            {
                categories: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } // cursor tipi ve yönü belirtilir
            }
        );
        // Sonuç kümesini işler ve kategorileri bir diziye dönüştürür.
        const resultSet = cursor.outBinds.categories; // Veritabanından dönen cursor
        let categories = [];
        let row;
        while ((row = await resultSet.getRow())) { // Cursor'dan her bir satırı alır
            categories.push(row);
        }
        await resultSet.close(); // Sonuç kümesini kapatır
        return formatSuccessResponse(categories, 'Categories retrieved successfully');
    } catch (error) {
        // Hata durumunda hata yanıtı döner.
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Kategori ID ile kategori getirir.
// Bu fonksiyon, belirli bir kategori ID'sine sahip kategoriyi veritabanından getirir.
const getCategoryById = async (categoryId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak belirli bir kategori ID'sine sahip kategoriyi alır.
        const result = await connection.execute(
            `
            DECLARE
                l_category category_pkg.t_category_rec;
            BEGIN
                category_pkg.get_by_id(:categoryId, l_category);
                :category_id := l_category.category_id;
                :category_name := l_category.category_name;
                :parent_category_id := l_category.parent_category_id;
            END;`,
            {
                categoryId: { val: categoryId, dir: oracledb.BIND_IN }, // Kategori ID'si giriş parametresi olarak kullanılır
                category_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }, // Çıkış parametresi olarak kategori ID'si döner
                category_name: { type: oracledb.STRING, dir: oracledb.BIND_OUT }, // Çıkış parametresi olarak kategori adı döner
                parent_category_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } // Çıkış parametresi olarak üst kategori ID'si döner
            }
        );

        // Başarı durumunda kategori bilgileri ile birlikte başarılı yanıt döner.
        return formatSuccessResponse({
            category_id: result.outBinds.category_id,
            category_name: result.outBinds.category_name,
            parent_category_id: result.outBinds.parent_category_id
        }, 'Category retrieved successfully');
    } catch (error) {
        // Hata durumunda hata yanıtı döner.
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Kategori günceller.
// Bu fonksiyon, belirli bir kategori ID'si ile kategoriyi günceller.
const updateCategory = async (categoryId, categoryName, parentCategoryId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak kategoriyi günceller ve işlemi tamamlar.
        await connection.execute(
            `BEGIN category_pkg.update_category(:categoryId, :categoryName, :parentCategoryId); COMMIT; END;`,
            {
                categoryId: categoryId, // Kategori ID'si giriş parametresi olarak bağlanır
                categoryName: categoryName, // Kategori adı giriş parametresi olarak bağlanır
                parentCategoryId: parentCategoryId // Üst kategori ID'si giriş parametresi olarak bağlanır
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Category updated successfully');
    } catch (error) {
        // Hata durumunda işlemi geri alır ve hata yanıtı döner.
        await rollbackTransaction(connection);
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Kategoriyi siler.
// Bu fonksiyon, belirli bir kategori ID'sine sahip kategoriyi siler.
const deleteCategory = async (categoryId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak kategoriyi siler ve işlemi tamamlar.
        await connection.execute(
            `BEGIN category_pkg.delete_category(:categoryId); COMMIT; END;`,
            {
                categoryId: categoryId // Kategori ID'si giriş parametresi olarak bağlanır
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Category deleted successfully');
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
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};

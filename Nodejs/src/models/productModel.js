const oracledb = require('oracledb'); 
const { getConnection, closeConnection, rollbackTransaction } = require('../utils/dbHelper');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/formatResponse');

// Yeni bir ürün ekler.
// Bu fonksiyon, belirli bir ürün adı, kategori ID'si ve fiyat ile yeni bir ürün ekler.
const addProduct = async (productName, categoryId, price) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak yeni bir ürün ekler ve işlemi tamamlar.
        await connection.execute(
            `BEGIN product_pkg.add_product(:productName, :categoryId, :price); COMMIT; END;`,
            {
                productName: productName, // Ürün adı giriş parametresi olarak bağlanır
                categoryId: categoryId, // Kategori ID'si giriş parametresi olarak bağlanır
                price: price // Fiyat giriş parametresi olarak bağlanır
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Product added successfully');
    } catch (error) {
        // Hata durumunda işlemi geri alır ve hata yanıtı döner.
        await rollbackTransaction(connection);
        throw formatErrorResponse(error);
    } finally {
        // Bağlantıyı kapatır.
        await closeConnection(connection);
    }
};

// Tüm ürünleri getirir.
// Bu fonksiyon, tüm ürünleri veritabanından getirir.
const getAllProducts = async () => {
    let connection;
    let resultSet;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak tüm ürünleri alır.
        const result = await connection.execute(
            `BEGIN
                :products := product_pkg.get_all;
            END;`,
            {
                products: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } // Çıkış parametresi olarak cursor döner
            }
        );

        resultSet = result.outBinds.products; // Veritabanından dönen cursor
        const products = [];

        let row;
        while ((row = await resultSet.getRow())) { // Cursor'dan her bir satırı alır
            products.push({
                productId: row[0], // Ürün ID'si
                productName: row[1], // Ürün adı
                categoryId: row[2], // Kategori ID'si
                price: row[3] // Fiyat
            });
        }

        await resultSet.close(); // Sonuç kümesini kapatır
        return formatSuccessResponse(products, 'Products retrieved successfully');
    } catch (error) {
        await rollbackTransaction(connection); // Hata durumunda işlemi geri alır
        throw formatErrorResponse(error); // Hata yanıtı döner
    } finally {
        await closeConnection(connection); // Bağlantıyı kapatır
    }
};

// Belirli bir ürün ID'sine sahip ürünü getirir.
// Bu fonksiyon, belirli bir ürün ID'sine sahip ürünü veritabanından getirir.
const getProductById = async (productId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak belirli bir ürün ID'sine sahip ürünü alır.
        const result = await connection.execute(
            `
            DECLARE
                l_product product_pkg.t_product_rec;
            BEGIN
                product_pkg.get_by_id(:productId, l_product);
                :product_id := l_product.product_id;
                :product_name := l_product.product_name;
                :category_id := l_product.category_id;
                :price := l_product.price;
            END;`,
            {
                productId: productId, // Ürün ID'si giriş parametresi olarak bağlanır
                product_id: { dir: oracledb.BIND_OUT }, // Çıkış parametresi olarak ürün ID'si döner
                product_name: { dir: oracledb.BIND_OUT }, // Çıkış parametresi olarak ürün adı döner
                category_id: { dir: oracledb.BIND_OUT }, // Çıkış parametresi olarak kategori ID'si döner
                price: { dir: oracledb.BIND_OUT } // Çıkış parametresi olarak fiyat döner
            }
        );

        // Başarı durumunda ürün bilgileri ile birlikte başarılı yanıt döner.
        return formatSuccessResponse({
            product_id: result.outBinds.product_id,
            product_name: result.outBinds.product_name,
            category_id: result.outBinds.category_id,
            price: result.outBinds.price
        }, 'Product retrieved successfully');
    } catch (error) {
        await rollbackTransaction(connection); // Hata durumunda işlemi geri alır
        throw formatErrorResponse(error); // Hata yanıtı döner
    } finally {
        await closeConnection(connection); // Bağlantıyı kapatır
    }
};

// Ürünü günceller.
// Bu fonksiyon, belirli bir ürün ID'si ile ürünü günceller.
const updateProduct = async (productId, productName, categoryId, price) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak ürünü günceller ve işlemi tamamlar.
        await connection.execute(
            `BEGIN product_pkg.update_product(:productId, :productName, :categoryId, :price); COMMIT; END;`,
            {
                productId: productId, // Ürün ID'si giriş parametresi olarak bağlanır
                productName: productName, // Ürün adı giriş parametresi olarak bağlanır
                categoryId: categoryId, // Kategori ID'si giriş parametresi olarak bağlanır
                price: price // Fiyat giriş parametresi olarak bağlanır
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Product updated successfully');
    } catch (error) {
        await rollbackTransaction(connection); // Hata durumunda işlemi geri alır
        throw formatErrorResponse(error); // Hata yanıtı döner
    } finally {
        await closeConnection(connection); // Bağlantıyı kapatır
    }
};

// Ürünü siler.
// Bu fonksiyon, belirli bir ürün ID'sine sahip ürünü siler.
const deleteProduct = async (productId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak ürünü siler ve işlemi tamamlar.
        await connection.execute(
            `BEGIN product_pkg.delete_product(:productId); COMMIT; END;`,
            {
                productId: productId // Ürün ID'si giriş parametresi olarak bağlanır
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Product deleted successfully');
    } catch (error) {
        await rollbackTransaction(connection); // Hata durumunda işlemi geri alır
        throw formatErrorResponse(error); // Hata yanıtı döner
    } finally {
        await closeConnection(connection); // Bağlantıyı kapatır
    }
};

// Belirli bir ürün ID'sine sahip ürünün var olup olmadığını kontrol eder.
// Bu fonksiyon, belirli bir ürün ID'sine sahip ürünün var olup olmadığını kontrol eder.
const existsById = async (productId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak ürünün var olup olmadığını kontrol eder.
        await connection.execute(
            `BEGIN product_pkg.exists_by_id(:productId); END;`,
            {
                productId: productId // Ürün ID'si giriş parametresi olarak bağlanır
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Product exists');
    } catch (error) {
        await rollbackTransaction(connection); // Hata durumunda işlemi geri alır
        throw formatErrorResponse(error); // Hata yanıtı döner
    } finally {
        await closeConnection(connection); // Bağlantıyı kapatır
    }
};

// Ürünleri filtreler ve sıralar.
// Bu fonksiyon, belirli kriterlere göre ürünleri filtreler ve sıralar.
const filterAndSort = async (categoryId, minPrice, maxPrice, sortOrder, favoriteOrder) => {
    let connection;
    let resultSet;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak ürünleri filtreler ve sıralar.
        const result = await connection.execute(
            `BEGIN
                product_pkg.filter_and_sort(:category_id, :min_price, :max_price, :sort_order, :favorite_order, :products);
            END;`,
            {
                category_id: categoryId, // Kategori ID'si giriş parametresi olarak bağlanır
                min_price: minPrice, // Minimum fiyat giriş parametresi olarak bağlanır
                max_price: maxPrice, // Maksimum fiyat giriş parametresi olarak bağlanır
                sort_order: sortOrder, // Sıralama düzeni giriş parametresi olarak bağlanır
                favorite_order: favoriteOrder, // Favori düzeni giriş parametresi olarak bağlanır
                products: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } // Çıkış parametresi olarak cursor döner
            }
        );

        resultSet = result.outBinds.products; // Veritabanından dönen cursor
        const products = [];

        let row;
        while ((row = await resultSet.getRow())) { // Cursor'dan her bir satırı alır
            products.push({
                productId: row[0], // Ürün ID'si
                productName: row[1], // Ürün adı
                categoryId: row[2], // Kategori ID'si
                price: row[3], // Fiyat
                categoryName: row[4] // Kategori adı
            });
        }

        await resultSet.close(); // Sonuç kümesini kapatır
        return formatSuccessResponse(products, 'Products filtered and sorted successfully');
    } catch (error) {
        await rollbackTransaction(connection); // Hata durumunda işlemi geri alır
        throw formatErrorResponse(error); // Hata yanıtı döner
    } finally {
        await closeConnection(connection); // Bağlantıyı kapatır
    }
};

// Ürün fiyatını getirir.
// Bu fonksiyon, belirli bir ürün ID'sine sahip ürünün fiyatını getirir.
const getProductPrice = async (productId) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak belirli bir ürün ID'sine sahip ürünün fiyatını alır.
        const result = await connection.execute(
            `BEGIN
                :price := product_pkg.get_product_price(:productId);
            END;`,
            {
                productId: { val: productId, dir: oracledb.BIND_IN, type: oracledb.NUMBER }, // Ürün ID'si giriş parametresi olarak bağlanır
                price: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } // Çıkış parametresi olarak fiyat döner
            }
        );

        // Başarı durumunda ürün fiyatı ile birlikte başarılı yanıt döner.
        return formatSuccessResponse(result.outBinds.price, 'Product price retrieved successfully');
    } catch (error) {
        await rollbackTransaction(connection); // Hata durumunda işlemi geri alır
        throw formatErrorResponse(error); // Hata yanıtı döner
    } finally {
        await closeConnection(connection); // Bağlantıyı kapatır
    }
};

// Fonksiyonları dışa aktarır ve kullanılabilir hale getirir.
module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    existsById,
    filterAndSort,
    getProductPrice
};

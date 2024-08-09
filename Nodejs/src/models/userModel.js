const oracledb = require('oracledb'); 
const { getConnection, closeConnection, rollbackTransaction } = require('../utils/dbHelper');
const { formatErrorResponse, formatSuccessResponse } = require('../utils/formatResponse');

// Kullanıcı giriş yapar.
// Bu fonksiyon, kullanıcı adı ve şifre ile giriş yapar ve kullanıcı ID'sini döner.
const login = async (username, password) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak kullanıcı girişini doğrular ve kullanıcı bilgilerini döner.
        const result = await connection.execute(
            `DECLARE
                v_user user_pkg.user_login_rec;
            BEGIN
                v_user := user_pkg.login(:username, :password);
                :user_id := v_user.user_id;
                :return_username := v_user.username;
            END;`,
            {
                user_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }, // Çıkış parametresi olarak kullanıcı ID'si döner
                return_username: { dir: oracledb.BIND_OUT, type: oracledb.STRING }, // Çıkış parametresi olarak kullanıcı adı döner
                username: username, // Kullanıcı adı giriş parametresi olarak bağlanır
                password: password // Şifre giriş parametresi olarak bağlanır
            }
        );
        // Başarı durumunda kullanıcı ID'si ve kullanıcı adı ile birlikte başarılı yanıt döner.
        return formatSuccessResponse({ userId: result.outBinds.user_id, username: result.outBinds.return_username }, 'Login successful');
    } catch (error) {
        await rollbackTransaction(connection); // Hata durumunda işlemi geri alır
        throw formatErrorResponse(error); // Hata yanıtı döner
    } finally {
        await closeConnection(connection); // Bağlantıyı kapatır
    }
};


// Kullanıcı şifresini değiştirir.
// Bu fonksiyon, belirli bir kullanıcı için eski şifreyi yeni şifre ile değiştirir.
const changePassword = async (userId, oldPassword, newPassword) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak şifreyi değiştirir ve işlemi bitirir.
        await connection.execute(
            `BEGIN
                user_pkg.change_password(:p_user_id, :p_old_password, :p_new_password);
                COMMIT;
            END;`,
            {
                p_user_id: userId, // Kullanıcı ID'si giriş parametresi olarak bağlanır
                p_old_password: oldPassword, // Eski şifre giriş parametresi olarak bağlanır
                p_new_password: newPassword // Yeni şifre giriş parametresi olarak bağlanır
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'Password changed successfully');
    } catch (error) {
        await rollbackTransaction(connection); // Hata durumunda işlemi geri alır
        throw formatErrorResponse(error); // Hata yanıtı döner
    } finally {
        await closeConnection(connection); // Bağlantıyı kapatır
    }
};

// Yeni bir kullanıcı kaydeder.
// Bu fonksiyon, kullanıcı adı ve şifre ile yeni bir kullanıcı kaydeder.
const registerUser = async (username, password) => {
    let connection;
    try {
        // Veritabanı bağlantısını açar.
        connection = await getConnection();
        // Veritabanına prosedür çağrısı yaparak yeni kullanıcıyı kaydeder ve işlemi bitirir.
        await connection.execute(
            `BEGIN
                user_pkg.register_user(:username, :password);
                COMMIT;
            END;`,
            {
                username: username, // Kullanıcı adı giriş parametresi olarak bağlanır
                password: password // Şifre giriş parametresi olarak bağlanır
            }
        );
        // Başarı durumunda başarılı yanıt döner.
        return formatSuccessResponse(null, 'User registered successfully');
    } catch (error) {
        await rollbackTransaction(connection); // Hata durumunda işlemi geri alır
        throw formatErrorResponse(error); // Hata yanıtı döner
    } finally {
        await closeConnection(connection); // Bağlantıyı kapatır
    }
};

// Fonksiyonları dışa aktarır ve kullanılabilir hale getirir.
module.exports = {
    login,
    changePassword,
    registerUser
};

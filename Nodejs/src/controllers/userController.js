const userModel = require('../models/userModel.js');

// Kullanıcı giriş işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kullanıcı adı ve şifreyi kullanarak kullanıcı girişi yapar.
const login = async (req, res) => {
    const { username, password } = req.body; // İstek gövdesinden kullanıcı adı ve şifreyi alır
    try {
        const response = await userModel.login(username, password); // Model fonksiyonunu çağırarak kullanıcı girişi yapar
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error);
    }
};

// Kullanıcı şifre değiştirme işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kullanıcı ID'si, eski şifre ve yeni şifreyi kullanarak kullanıcı şifresini değiştirir.
const changePassword = async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body; // İstek gövdesinden kullanıcı ID'si, eski şifre ve yeni şifreyi alır
    try {
        const response = await userModel.changePassword(userId, oldPassword, newPassword); // Model fonksiyonunu çağırarak şifre değiştirir
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Yeni kullanıcı kayıt işlemi
// Bu fonksiyon, gelen HTTP isteğiyle belirtilen kullanıcı adı ve şifreyi kullanarak yeni bir kullanıcı kaydeder.
const registerUser = async (req, res) => {
    const { username, password } = req.body; // İstek gövdesinden kullanıcı adı ve şifreyi alır
    try {
        const response = await userModel.registerUser(username, password); // Model fonksiyonunu çağırarak yeni kullanıcı kaydeder
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

// Kullanıcı listesini alma işlemi
// Bu fonksiyon, gelen HTTP isteğiyle tüm kullanıcıları getirir.
const getUsers = async (req, res) => {
    try {
        const response = await userModel.getUsers(); // Model fonksiyonunu çağırarak tüm kullanıcıları alır
        res.status(200).json(response); 
    } catch (error) {
        res.status(500).json(error); 
    }
};

module.exports = {
    login,
    changePassword,
    registerUser,
    getUsers
};

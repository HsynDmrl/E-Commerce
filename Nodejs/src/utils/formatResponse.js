// Hata yanıtını formatlar ve döner.
// Bu fonksiyon, verilen hata nesnesini alır ve formatlanmış bir hata yanıtı döner.
const formatErrorResponse = (error) => {
    // Hata mesajının ilk satırını alır
    const errorMessage = error.message.split('\n')[0];
    // ORA- ile başlayan hata kodunu bulur
    const statusCodeMatch = errorMessage.match(/^ORA-\d+/); // '/^ORA-\d+/' şu işe yarar: '^' ile başlayan ve 'ORA-' ile başlayan ve '\d+' ile biten bir ifade arar.
    // Hata kodunu belirler, eğer yoksa 'UNKNOWN_ERROR' olarak ayarlar
    const statusCode = statusCodeMatch ? statusCodeMatch[0] : 'UNKNOWN_ERROR';
    // Hata mesajından hata kodunu çıkarır
    const message = errorMessage.replace(/^ORA-\d+:\s*/, ''); // '/^ORA-\d+:\s*/' şu işe yarar: '^' ile başlayan ve 'ORA-' ile başlayan ve '\d+' ile biten ve ':' ile biten ve '\s*' ile biten bir ifade arar.
    // Hata yanıtını formatlar ve döner
    return {
        status: 'error',
        code: statusCode,
        message: message,
    };
};

// Başarılı yanıtı formatlar ve döner.
// Bu fonksiyon, verilen veri ve mesajı alır ve formatlanmış bir başarılı yanıt döner.
const formatSuccessResponse = (data, message) => {
    return {
        status: 'success',
        data: data,
        message: message,
    };
};

// Fonksiyonları dışa aktarır ve kullanılabilir hale getirir.
module.exports = {
    formatErrorResponse,
    formatSuccessResponse,
};

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS ayarları
const corsOptions = {
    origin: 'http://localhost:3001', // CORS yapılandırması için izin verilen kaynak
};

// Middleware ayarları
app.use(cors(corsOptions)); // CORS middleware'i kullanılır
app.use(bodyParser.json()); // JSON istek gövdelerini ayrıştırmak için bodyParser kullanılır

// Rotalar
app.use('/', routes); // Tüm rotalar için 'routes' modülü kullanılır

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`); // Sunucunun dinlemekte olduğu portu konsola yazdırır
});

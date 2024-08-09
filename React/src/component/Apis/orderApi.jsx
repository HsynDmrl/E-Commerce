import React from 'react';
import Container from 'react-bootstrap/Container';

const OrderApi = () => {
    return (
        <Container>
            <h1>Order API Dökümantasyon</h1>

            <h2>GET /list/:userId</h2>
            <p>Açıklama: Belirli bir kullanıcının sipariş listesini getirir.</p>
            <p><strong>URL Parametreleri:</strong></p>
            <pre><code className="json">
{`{
    "userId": "kullanici_id"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "data": [
        {
            "order_id": 1,
            "user_id": "kullanici_id",
            "order_date": "2023-01-01T00:00:00.000Z",
            "total_amount": 100,
            "user_name": "Kullanıcı Adı"
        }
    ],
    "message": "Order list retrieved successfully"
}`}
            </code></pre>

            <h2>GET /listdetail/:orderId</h2>
            <p>Açıklama: Belirli bir siparişin detaylarını getirir.</p>
            <p><strong>URL Parametreleri:</strong></p>
            <pre><code className="json">
{`{
    "orderId": "siparis_id"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "data": [
        {
            "order_detail_id": 1,
            "order_id": "siparis_id",
            "product_id": "urun_id",
            "quantity": 2,
            "product_name": "Ürün Adı",
            "price": 50
        }
    ],
    "message": "Order details retrieved successfully"
}`}
            </code></pre>
        </Container>
    );
};

export default OrderApi;

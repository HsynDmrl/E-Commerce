import React from 'react';
import Container from 'react-bootstrap/Container';

const BasketApi = () => {
    return (
        <Container>
            <h1>Basket API Dökümantasyon</h1>

            <h2>POST /add</h2>
            <p>Açıklama: Sepete yeni bir ürün ekler.</p>
            <p><strong>İstek Gövdesi:</strong></p>
            <pre><code className="json">
{`{
    "userId": "kullanici_id",
    "productId": "urun_id",
    "quantity": 2
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Basket item added successfully"
}`}
            </code></pre>

            <h2>GET /get/:userId</h2>
            <p>Açıklama: Kullanıcının sepetindeki ürünleri getirir.</p>
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
            "basket_item_id": 1,
            "product_id": "urun_id",
            "quantity": 2,
            "product_name": "Ürün Adı",
            "price": 100
        }
    ],
    "message": "Basket items retrieved successfully"
}`}
            </code></pre>

            <h2>PUT /decrease/:basketItemId</h2>
            <p>Açıklama: Sepetteki ürün miktarını azaltır.</p>
            <p><strong>URL Parametreleri:</strong></p>
            <pre><code className="json">
{`{
    "basketItemId": "sepet_ogesi_id"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Item quantity decreased successfully"
}`}
            </code></pre>

            <h2>PUT /increase/:basketItemId</h2>
            <p>Açıklama: Sepetteki ürün miktarını artırır.</p>
            <p><strong>URL Parametreleri:</strong></p>
            <pre><code className="json">
{`{
    "basketItemId": "sepet_ogesi_id"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Item quantity increased successfully"
}`}
            </code></pre>

            <h2>DELETE /delete/:basketItemId</h2>
            <p>Açıklama: Sepetten bir ürünü siler.</p>
            <p><strong>URL Parametreleri:</strong></p>
            <pre><code className="json">
{`{
    "basketItemId": "sepet_ogesi_id"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Basket item deleted successfully"
}`}
            </code></pre>

            <h2>DELETE /clear/:userId</h2>
            <p>Açıklama: Kullanıcının sepetini temizler.</p>
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
    "message": "Basket cleared successfully"
}`}
            </code></pre>
        </Container>
    );
};

export default BasketApi;

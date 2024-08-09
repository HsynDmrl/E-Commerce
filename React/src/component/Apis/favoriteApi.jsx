import React from 'react';
import Container from 'react-bootstrap/Container';

const FavoriteApi = () => {
    return (
        <Container>
            <h1>Favorite API Dökümantasyon</h1>

            <h2>POST /add</h2>
            <p>Açıklama: Kullanıcının favorilerine yeni bir ürün ekler.</p>
            <p><strong>İstek Gövdesi:</strong></p>
            <pre><code className="json">
{`{
    "userId": "kullanici_id",
    "productId": "urun_id"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Favorite added successfully"
}`}
            </code></pre>

            <h2>POST /remove</h2>
            <p>Açıklama: Kullanıcının favorilerinden bir ürünü çıkarır.</p>
            <p><strong>İstek Gövdesi:</strong></p>
            <pre><code className="json">
{`{
    "userId": "kullanici_id",
    "productId": "urun_id"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Favorite removed successfully"
}`}
            </code></pre>

            <h2>GET /user/:userId</h2>
            <p>Açıklama: Belirli bir kullanıcının favori ürünlerini getirir.</p>
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
            "favorite_id": 1,
            "user_id": "kullanici_id",
            "username": "kullanici_adi",
            "product_id": "urun_id",
            "product_name": "Ürün Adı",
            "category_id": "kategori_id",
            "price": 100,
            "favorite_date": "favori_tarihi"
        }
    ],
    "message": "Favorites retrieved successfully"
}`}
            </code></pre>

            <h2>GET /getall</h2>
            <p>Açıklama: Tüm favori ürünleri getirir.</p>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "data": [
        {
            "favorite_id": 1,
            "product_id": "urun_id",
            "product_name": "Ürün Adı",
            "user_id": "kullanici_id",
            "username": "kullanici_adi",
            "category_id": "kategori_id",
            "price": 100,
            "favorite_date": "favori_tarihi"
        }
    ],
    "message": "Favorites retrieved successfully"
}`}
            </code></pre>
        </Container>
    );
};

export default FavoriteApi;

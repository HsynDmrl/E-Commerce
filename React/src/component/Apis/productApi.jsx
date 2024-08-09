import React from 'react';
import Container from 'react-bootstrap/Container';

const ProductApi = () => {
    return (
        <Container>
            <h1>Product API Dökümantasyon</h1>

            <h2>POST /add</h2>
            <p>Açıklama: Yeni bir ürün ekler.</p>
            <p><strong>İstek Gövdesi:</strong></p>
            <pre><code className="json">
{`{
    "productName": "Ürün Adı",
    "categoryId": 1,
    "price": 100
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Product added successfully"
}`}
            </code></pre>

            <h2>GET /getall</h2>
            <p>Açıklama: Tüm ürünleri getirir.</p>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "data": [
        {
            "productId": 1,
            "productName": "Ürün Adı",
            "categoryId": 1,
            "price": 100
        }
    ],
    "message": "Products retrieved successfully"
}`}
            </code></pre>

            <h2>GET /getbyid/:productId</h2>
            <p>Açıklama: Belirli bir ürünü ID ile getirir.</p>
            <p><strong>URL Parametreleri:</strong></p>
            <pre><code className="json">
{`{
    "productId": 1
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "data": {
        "productId": 1,
        "productName": "Ürün Adı",
        "categoryId": 1,
        "price": 100
    },
    "message": "Product retrieved successfully"
}`}
            </code></pre>

            <h2>PUT /update/:productId</h2>
            <p>Açıklama: Belirli bir ürünü günceller.</p>
            <p><strong>URL Parametreleri:</strong></p>
            <pre><code className="json">
{`{
    "productId": 1
}`}
            </code></pre>
            <p><strong>İstek Gövdesi:</strong></p>
            <pre><code className="json">
{`{
    "productName": "Yeni Ürün Adı",
    "categoryId": 2,
    "price": 150
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Product updated successfully"
}`}
            </code></pre>

            <h2>DELETE /delete/:productId</h2>
            <p>Açıklama: Belirli bir ürünü siler.</p>
            <p><strong>URL Parametreleri:</strong></p>
            <pre><code className="json">
{`{
    "productId": 1
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Product deleted successfully"
}`}
            </code></pre>

            <h2>GET /exists_by_id/:productId</h2>
            <p>Açıklama: Belirli bir ürünün var olup olmadığını kontrol eder.</p>
            <p><strong>URL Parametreleri:</strong></p>
            <pre><code className="json">
{`{
    "productId": 1
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Product exists"
}`}
            </code></pre>

            <h2>POST /filter_and_sort</h2>
            <p>Açıklama: Ürünleri filtreler ve sıralar.</p>
            <p><strong>İstek Gövdesi:</strong></p>
            <pre><code className="json">
{`{
    "categoryId": 1,
    "minPrice": 50,
    "maxPrice": 200,
    "sortOrder": "asc",
    "favoriteOrder": "desc"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "data": [
        {
            "productId": 1,
            "productName": "Ürün Adı",
            "categoryId": 1,
            "price": 100,
            "categoryName": "Kategori Adı"
        }
    ],
    "message": "Products filtered and sorted successfully"
}`}
            </code></pre>

            <h2>GET /get_product_price/:productId</h2>
            <p>Açıklama: Belirli bir ürünün fiyatını getirir.</p>
            <p><strong>URL Parametreleri:</strong></p>
            <pre><code className="json">
{`{
    "productId": 1
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "data": 100,
    "message": "Product price retrieved successfully"
}`}
            </code></pre>
        </Container>
    );
};

export default ProductApi;

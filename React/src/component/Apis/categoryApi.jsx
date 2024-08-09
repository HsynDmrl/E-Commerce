import React from 'react';
import Container from 'react-bootstrap/Container';

const CategoryApi = () => {
    return (
        <Container>
            <h1>Category API Dökümantasyon</h1>

            <h2>POST /add</h2>
            <p>Açıklama: Yeni bir kategori ekler.</p>
            <p><strong>İstek Gövdesi:</strong></p>
            <pre><code className="json">
{`{
    "categoryName": "kategori_adı",
    "parentCategoryId": "ebeveyn_kategori_id"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Category added successfully"
}`}
            </code></pre>

            <h2>GET /getall</h2>
            <p>Açıklama: Tüm kategorileri getirir.</p>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "data": [
        {
            "category_id": 1,
            "category_name": "Kategori Adı",
            "parent_category_id": null
        }
    ],
    "message": "Categories retrieved successfully"
}`}
            </code></pre>

            <h2>GET /getbyid/:categoryId</h2>
            <p>Açıklama: Belirli bir kategoriyi ID ile getirir.</p>
            <p><strong>URL Parametreleri:</strong></p>
            <pre><code className="json">
{`{
    "categoryId": "kategori_id"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "data": {
        "category_id": 1,
        "category_name": "Kategori Adı",
        "parent_category_id": null
    },
    "message": "Category retrieved successfully"
}`}
            </code></pre>

            <h2>PUT /update/:categoryId</h2>
            <p>Açıklama: Belirli bir kategoriyi günceller.</p>
            <p><strong>URL Parametreleri:</strong></p>
            <pre><code className="json">
{`{
    "categoryId": "kategori_id"
}`}
            </code></pre>
            <p><strong>İstek Gövdesi:</strong></p>
            <pre><code className="json">
{`{
    "categoryName": "yeni_kategori_adı",
    "parentCategoryId": "yeni_ebeveyn_kategori_id"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Category updated successfully"
}`}
            </code></pre>

            <h2>DELETE /delete/:categoryId</h2>
            <p>Açıklama: Belirli bir kategoriyi siler.</p>
            <p><strong>URL Parametreleri:</strong></p>
            <pre><code className="json">
{`{
    "categoryId": "kategori_id"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Category deleted successfully"
}`}
            </code></pre>
        </Container>
    );
};

export default CategoryApi;

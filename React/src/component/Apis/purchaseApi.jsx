import React from 'react';
import Container from 'react-bootstrap/Container';

const PurchaseApi = () => {
    return (
        <Container>
            <h1>Purchase API Dökümantasyon</h1>

            <h2>POST /complete/:userId</h2>
            <p>Açıklama: Belirli bir kullanıcının satın alma işlemini tamamlar.</p>
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
    "message": "Purchase completed successfully"
}`}
            </code></pre>
        </Container>
    );
};

export default PurchaseApi;

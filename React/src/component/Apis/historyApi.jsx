import React from 'react';
import Container from 'react-bootstrap/Container';

const HistoryApi = () => {
    return (
        <Container>
            <h1>History API Dökümantasyon</h1>

            <h2>GET /generate/:userId</h2>
            <p>Açıklama: Belirli bir kullanıcının satın alma geçmişini CSV formatında oluşturur.</p>
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
    "message": "History CSV generated successfully"
}`}
            </code></pre>

            <h2>GET /get/:userId</h2>
            <p>Açıklama: Belirli bir kullanıcının satın alma geçmişini CSV formatında getirir.</p>
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
    "data": "CSV content here",
    "message": "Purchase history fetched successfully"
}`}
            </code></pre>
        </Container>
    );
};

export default HistoryApi;

import React from 'react';
import Container from 'react-bootstrap/Container';

const UserApi = () => {
    return (
        <Container>
            <h1>User API Dökümantasyon</h1>

            <h2>POST /login</h2>
            <p>Açıklama: Kullanıcı giriş yapar.</p>
            <p><strong>İstek Gövdesi:</strong></p>
            <pre><code className="json">
{`{
    "username": "kullanici_adi",
    "password": "sifre"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "data": {
        "userId": 1,
        "username": "kullanici_adi"
    },
    "message": "Login successful"
}`}
            </code></pre>

            <h2>POST /change-password</h2>
            <p>Açıklama: Kullanıcı şifresini değiştirir.</p>
            <p><strong>İstek Gövdesi:</strong></p>
            <pre><code className="json">
{`{
    "userId": 1,
    "oldPassword": "eski_sifre",
    "newPassword": "yeni_sifre"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "Password changed successfully"
}`}
            </code></pre>

            <h2>POST /register</h2>
            <p>Açıklama: Yeni kullanıcı kaydı yapar.</p>
            <p><strong>İstek Gövdesi:</strong></p>
            <pre><code className="json">
{`{
    "username": "yeni_kullanici_adi",
    "password": "sifre"
}`}
            </code></pre>
            <p><strong>Yanıt:</strong></p>
            <pre><code className="json">
{`{
    "status": "success",
    "message": "User registered successfully"
}`}
            </code></pre>
        </Container>
    );
}

export default UserApi;
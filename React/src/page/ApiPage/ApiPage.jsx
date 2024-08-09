import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import BasketApi from '../../component/Apis/basketApi.jsx';
import CategoryApi from '../../component/Apis/categoryApi.jsx';
import FavoriteApi from '../../component/Apis/favoriteApi.jsx';
import HistoryApi from '../../component/Apis/historyApi.jsx';
import OrderApi from '../../component/Apis/orderApi.jsx';
import ProductApi from '../../component/Apis/productApi.jsx';
import PurchaseApi from '../../component/Apis/purchaseApi.jsx';
import UserApi from '../../component/Apis/userApi.jsx';
import FrontendTechnologies from '../../component/Apis/frontendTechnologies.jsx';

const ApiPage = () => {
    const [activeKey, setActiveKey] = useState('basketApi');

    return (
        <Container className='shadow-lg rounded mb-5' style={{ marginTop: '70px' }}>
            <Row>
                <Col md={4} className="bg-light p-3">
                    <Nav variant="pills" className="flex-column" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                        <Nav.Item>
                            <Nav.Link eventKey="basketApi">Basket API</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="categoryApi">Category API</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="favoriteApi">Favorite API</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="historyApi">History API</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="orderApi">Order API</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="productApi">Product API</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="purchaseApi">Purchase API</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="userApi">User API</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="frontendTechnologies">Frontend Technologies</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col md={8}>
                    {activeKey === 'basketApi' && <BasketApi />}
                    {activeKey === 'categoryApi' && <CategoryApi />}
                    {activeKey === 'favoriteApi' && <FavoriteApi />}
                    {activeKey === 'historyApi' && <HistoryApi />}
                    {activeKey === 'orderApi' && <OrderApi />}
                    {activeKey === 'productApi' && <ProductApi />}
                    {activeKey === 'purchaseApi' && <PurchaseApi />}
                    {activeKey === 'userApi' && <UserApi />}
                    {activeKey === 'frontendTechnologies' && <FrontendTechnologies />}
                </Col>
            </Row>
        </Container>
    );
}

export default ApiPage;

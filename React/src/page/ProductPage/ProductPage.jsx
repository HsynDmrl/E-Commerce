import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Filter from '../../component/Filter/filter.jsx';
import ProductDashboard from '../../component/ProductDashboard/productDashboard.jsx';

const ProductPage = () => {
    return (
        <Container className='shadow-lg rounded mb-5' style={{ marginTop: '70px' }}>
            <Row>
                <Col md={3}>
                    <Filter/>
                </Col>
                <Col md={9}>
                    <ProductDashboard />
                </Col>
            </Row>
        </Container>
    );
}

export default ProductPage;

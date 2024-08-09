import React from 'react';
import { Card, Button, Alert } from 'react-bootstrap';

const BasketSummary = ({ totalAmount, handleClearBasket, handlePurchase, message, error }) => {
    return (
        <Card.Footer className="text-center">
            <div className="mb-2">
                <h6>Total Amount: ${totalAmount}</h6>
            </div>
            <div className="d-flex justify-content-between">
                <Button variant="danger" onClick={handleClearBasket}>Clear Basket</Button>
                <Button variant="success" onClick={handlePurchase}>Purchase</Button>
            </div>
            {message && <Alert className='mt-3' variant="success">{message.toString()}</Alert>}
            {error && <Alert className='mt-3' variant="danger">{error.toString()}</Alert>}
        </Card.Footer>
    );
};

export default BasketSummary;

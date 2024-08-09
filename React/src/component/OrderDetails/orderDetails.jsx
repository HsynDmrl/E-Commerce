import React from 'react';
import { ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap';

const OrderDetails = ({ orderDetails, onBackToList, selectedOrderId }) => (
    <div>
        <Button variant="warning" onClick={onBackToList} className="mb-3 text-white">
         Back to Order List
        </Button>
        <h6 className="text-center">Order Details for Order ID: {selectedOrderId}</h6>
        <Card>
            <Card.Body>
                {orderDetails.length === 0 ? (
                    <div className="text-center">No details found for this order</div>
                ) : (
                    <ListGroup>
                        {orderDetails.map((detail) => (
                            <ListGroupItem key={detail.order_detail_id} className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h6>Product: {detail.product_name}</h6>
                                    <p>Quantity: {detail.quantity}</p>
                                    <p>Unit Price: ${detail.price.toFixed(2)}</p>
                                    <p>Total Price: ${(detail.price * detail.quantity).toFixed(2)}</p> {/* Toplam fiyat hesaplanıp gösteriliyor */}
                                </div>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    </div>
);

export default OrderDetails;

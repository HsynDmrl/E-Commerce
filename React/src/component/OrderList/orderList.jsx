import React from 'react';
import { ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap';

const OrderList = ({ orders, onOrderClick, onGenerateCSV }) => {
    const sortedOrders = [...orders].sort((a, b) => b.order_id - a.order_id);

    return (
        <Card>
            <Card.Body>
                {sortedOrders.length === 0 ? (
                    <div className="text-center">No orders found</div>
                ) : (
                    <ListGroup>
                        {sortedOrders.map((order) => (
                            <ListGroupItem key={order.order_id} className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h6>Order ID: {order.order_id}</h6>
                                    <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
                                    <p>Total Amount: ${order.total_amount.toFixed(2)}</p>
                                </div>
                                <Button className='text-white' variant="warning" onClick={() => onOrderClick(order.order_id)}>
                                    View Details
                                </Button>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
            <Card.Footer className="text-center">
                <Button variant="info" onClick={onGenerateCSV}>Download CSV</Button>
            </Card.Footer>
        </Card>
    );
};

export default OrderList;

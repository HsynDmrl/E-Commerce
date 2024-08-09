import React from 'react';
import { Button, ListGroupItem, Image, Row, Col } from 'react-bootstrap';
import { GrTrash } from 'react-icons/gr';
import examplePhoto from '../../assets/images/examplephoto.png';

const BasketItem = ({ item, handleIncrease, handleDecrease, handleDelete }) => {
    return (
        <ListGroupItem key={item.basket_item_id} className="mb-3">
            <Row className="align-items-center">
                <Col xs={2} className="d-flex justify-content-center">
                    <Image src={examplePhoto} alt={item.product_name} width="50" height="50" rounded />
                </Col>
                <Col xs={4} className="text-truncate">
                    <h6 className="mb-0">{item.product_name}</h6>
                    <p className="mb-0 text-muted">${item.price.toFixed(2)}</p>
                </Col>
                <Col xs={3} className="d-flex align-items-center justify-content-center">
                    <Button variant="outline-secondary" size="sm" className='mx-1' onClick={() => handleDecrease(item.basket_item_id)}>-</Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="outline-secondary" size="sm" className='mx-1' onClick={() => handleIncrease(item.basket_item_id)}>+</Button>
                </Col>
                <Col xs={3} className="d-flex align-items-center justify-content-end">
                    <Button variant="outline-danger" size="sm" className="mx-3" onClick={() => handleDelete(item.basket_item_id)}>
                        <GrTrash />
                    </Button>
                    <p className="mb-0">${(item.price * item.quantity).toFixed(2)}</p>
                </Col>
            </Row>
        </ListGroupItem>
    );
};

export default BasketItem;

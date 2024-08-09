import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Alert, Button } from 'react-bootstrap';
import { completePurchase, clearMessage, clearError } from '../../store/purchaseSlice';
import { clearBasketItems, getBasketItems, increaseItemQuantity, decreaseItemQuantity, deleteBasketItem } from '../../store/basketSlice';
import BasketItem from '../../component/Basket/basketItem';

const Purchase = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const basketItems = useSelector((state) => state.basket.basketItems);
    const userId = useSelector(state => state.user.userId);
    const message = useSelector((state) => state.purchase.message);
    const error = useSelector((state) => state.purchase.error);

    useEffect(() => {
        if (userId) {
            dispatch(getBasketItems(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(clearMessage());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleCompletePurchase = async () => {
        const resultAction = await dispatch(completePurchase(userId));
        if (completePurchase.fulfilled.match(resultAction)) {
            setTimeout(() => {
                dispatch(clearBasketItems());
                navigate('/');
            }, 5000);
        }
    };

    const handleIncrease = async (itemId) => {
        await dispatch(increaseItemQuantity(itemId));
        dispatch(getBasketItems(userId));
    };

    const handleDecrease = async (itemId) => {
        await dispatch(decreaseItemQuantity(itemId));
        dispatch(getBasketItems(userId));
    };

    const handleDelete = async (itemId) => {
        await dispatch(deleteBasketItem(itemId));
        dispatch(getBasketItems(userId));
    };

    const calculateTotalAmount = () => {
        return basketItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <Container className="p-3 shadow-lg rounded mb-5" style={{ minWidth: '300px', marginTop: '70px' }}>
            <Row>
                <Col>
                    <h3 className="text-center mb-4">Purchase Summary</h3>
                    <Card>
                        <Card.Body>
                            {basketItems.length === 0 ? (
                                <div className="text-center">Basket is empty</div>
                            ) : (
                                <ListGroup variant="flush">
                                    {basketItems.map((item) => (
                                        <BasketItem
                                            key={item.basket_item_id}
                                            item={item}
                                            handleIncrease={handleIncrease}
                                            handleDecrease={handleDecrease}
                                            handleDelete={handleDelete}
                                        />
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <div className="mb-2">
                                <h6>Total Amount: ${calculateTotalAmount()}</h6>
                            </div>
                            <Button variant="success" onClick={handleCompletePurchase}>Confirm Purchase</Button>
                            {message && <Alert className='mt-3' variant="success">{message}</Alert>}
                            {error && <Alert className='mt-3' variant="danger">{error}</Alert>}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Purchase;

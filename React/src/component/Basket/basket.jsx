import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { getBasketItems, increaseItemQuantity, decreaseItemQuantity, deleteBasketItem, clearBasket, clearMessage, clearError } from '../../store/basketSlice';
import BasketItem from './basketItem';
import BasketSummary from './basketSummary';

const Basket = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const basketItems = useSelector((state) => state.basket.basketItems);
    const userId = useSelector(state => state.user.userId);
    const message = useSelector((state) => state.basket.message);
    const error = useSelector((state) => state.basket.error);

    useEffect(() => {
        if (userId) {
            dispatch(getBasketItems(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (message || error) {
            const timer = setTimeout(() => {
                dispatch(clearMessage());
                dispatch(clearError());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, error, dispatch]);

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

    const handleClearBasket = async () => {
        await dispatch(clearBasket(userId));
        dispatch(getBasketItems(userId));
    };

    const handlePurchase = () => {
        navigate('/purchase');
    };

    const calculateTotalAmount = () => {
        return basketItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <Container className="p-3 bg-warning shadow-lg rounded" style={{ minWidth: '550px', maxWidth: '800px', margin: 'auto' }}>
            <Row>
                <Col>
                    <h3 className="text-center mb-4 text-white">My Basket</h3>
                    <Card>
                        <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
                        {basketItems.length > 0 && (
                            <BasketSummary
                                totalAmount={calculateTotalAmount()}
                                handleClearBasket={handleClearBasket}
                                handlePurchase={handlePurchase}
                                message={message}
                                error={error}
                            />
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Basket;

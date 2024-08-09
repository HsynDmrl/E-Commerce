import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchFavoritesByUser, removeFavorite } from '../../store/favoriteSlice';
import examplePhoto from '../../assets/images/examplephoto.png';
import { MdOutlineFavorite } from "react-icons/md";
import './Favorite.css';

const Favorite = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userId);
    const favorites = useSelector(state => state.favorite.favorites) || [];

    useEffect(() => {
        if (userId) {
            dispatch(fetchFavoritesByUser(userId));
        }
    }, [dispatch, userId]);

    const handleRemoveFavorite = (productId) => {
        dispatch(removeFavorite({ userId, productId }));
    };

    const sortedFavorites = [...favorites].sort((a, b) => new Date(b.favorite_date) - new Date(a.favorite_date));

    return (
        <Container className="p-3 product-dashboard shadow-lg rounded" style={{ minWidth: '300px' }}>
            <Row>
                <Col>
                    <h6 className="text-center mb-4">My Favorites</h6>
                    <Card>
                        <Card.Body>
                            {sortedFavorites.length === 0 ? (
                                <div className="text-center">No favorites found</div>
                            ) : (
                                <Row>
                                    {sortedFavorites.map((favorite) => (
                                        <Col key={favorite.product_id} md={6} lg={4} className="mb-4">
                                            <Card className="product-card shadow-sm">
                                                <div className="favorite-button-container">
                                                    <Button
                                                        variant="outline-light"
                                                        className="favorite-button"
                                                        onClick={() => handleRemoveFavorite(favorite.product_id)}>
                                                        <MdOutlineFavorite style={{ color: 'red', fontSize: '24px' }} />
                                                    </Button>
                                                </div>
                                                <Card.Img variant="top" src={examplePhoto} className="mb-3 product-image" />
                                                <Card.Body>
                                                    <Card.Title className="product-title">{favorite.product_name}</Card.Title>
                                                    <Card.Text className="product-category">Added Date: {new Date(favorite.favorite_date).toLocaleString()}</Card.Text>
                                                    <Card.Text className="product-price">Price: ${favorite.price}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Favorite;

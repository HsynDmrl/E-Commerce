import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import './ProductDashboard.css';
import examplePhoto from '../../assets/images/examplephoto.png';
import { addBasketItem, getBasketItems } from '../../store/basketSlice';
import { addFavorite, removeFavorite, fetchFavoritesByUser, fetchAllFavorites } from '../../store/favoriteSlice';

const ProductDashboard = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const userId = useSelector((state) => state.user.userId);
    const userFavorites = useSelector((state) => state.favorite.favorites);
    const allFavorites = useSelector((state) => state.favorite.allFavorites);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        if (userId) {
            dispatch(fetchFavoritesByUser(userId));
        }
        dispatch(fetchAllFavorites());
    }, [dispatch, userId]);

    const handleAddToCart = async (product) => {
        await dispatch(addBasketItem({
            userId: userId,
            productId: product.productId,
            productName: product.productName,
            price: product.price,
            quantity: 1,
        }));
        dispatch(getBasketItems(userId));
    };

    const handleFavoriteToggle = async (productId) => {
        if (userFavorites.some(favorite => favorite.product_id === productId)) {
            await dispatch(removeFavorite({ userId, productId }));
        } else {
            await dispatch(addFavorite({ userId, productId }));
        }
        dispatch(fetchAllFavorites());
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!products || products.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <Container className="product-dashboard">
            <Row>
                {products.map((product) => (
                    <Col key={product.productId} md={4} className='mb-4'>
                        <Card className='product-card shadow-sm'>
                            {allFavorites.some(favorite => favorite.product_id === product.productId) && (
                                <div className="most-favorited-badge">
                                    <span>Most Liked</span>
                                </div>
                            )}
                            <div className="favorite-button-container">
                                {userId && (
                                    <Button
                                        variant='outline-light'
                                        className='favorite-button'
                                        onClick={() => handleFavoriteToggle(product.productId)}>
                                        {userFavorites.some(favorite => favorite.product_id === product.productId) 
                                            ? <MdOutlineFavorite style={{ color: 'red', fontSize: '24px' }} /> 
                                            : <MdOutlineFavoriteBorder style={{ color: 'red', fontSize: '24px' }} />}
                                    </Button>
                                )}
                            </div>
                            <Card.Img variant='top' src={examplePhoto} className='mb-3' />
                            <Card.Body>
                                <Card.Title className='product-title'>{product.productName}</Card.Title>
                                <Card.Text className='product-category'>Category: {product.categoryName}</Card.Text>
                                <Card.Text className='product-price'>Price: ${product.price}</Card.Text>
                                <Button
                                    className='add-to-cart-btn text-light'
                                    variant='warning'
                                    onClick={() => handleAddToCart(product)}>
                                    Add to Basket
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductDashboard;

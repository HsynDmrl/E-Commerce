import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import { fetchProducts } from '../../store/productSlice';
import './Filter.css';

const Filter = () => {
    const categories = useSelector((state) => state.category.categories);
    const dispatch = useDispatch();
    const [isFixed, setIsFixed] = useState(true);

    useEffect(() => {
        dispatch(fetchCategories());

        const fetchProductValues = {
            categoryId: null,
            minPrice: null,
            maxPrice: null,
            sortOrder: 'ASC',
            favoriteOrder: 'DESC'
        }

        dispatch(fetchProducts(fetchProductValues));
        
        const handleScroll = () => {
            const footerHeight = document.querySelector('footer').clientHeight;
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const threshold = documentHeight - footerHeight * 1.15;

            setIsFixed(scrollPosition < threshold);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [dispatch]);

    const handleSubmit = (values) => {
        const filteredValues = {
            categoryId: values.category ? values.category : null,
            minPrice: values.minPrice ? values.minPrice : null,
            maxPrice: values.maxPrice ? values.maxPrice : null,
            sortOrder: values.sortOrder,
            favoriteOrder: values.favoriteOrder
        };
        dispatch(fetchProducts(filteredValues));
    };

    const parentCategories = categories.filter(category => category.parentId === null);
    const childCategories = categories.filter(category => category.parentId !== null);

    return (
        <Container fluid className="d-flex">
            <div className={`sidebar shadow-lg rounded bg-light mt-4 p-3 ${isFixed ? 'fixed' : 'absolute'}`}>
                <Formik
                    initialValues={{ category: '', minPrice: '', maxPrice: '', sortOrder: 'ASC', favoriteOrder: 'DESC' }}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, handleChange, values }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formCategory" className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a category</option>
                                    {parentCategories.map((parent) => (
                                        <optgroup key={parent.id} label={parent.name}>
                                            {childCategories
                                                .filter(child => child.parentId === parent.id)
                                                .map((child) => (
                                                    <option key={child.id} value={child.id}>
                                                        {child.name}
                                                    </option>
                                                ))}
                                        </optgroup>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formMinPrice" className="mb-3">
                                <Form.Label>Min Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="minPrice"
                                    value={values.minPrice}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formMaxPrice" className="mb-3">
                                <Form.Label>Max Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="maxPrice"
                                    value={values.maxPrice}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formSortOrder" className="mb-3">
                                <Form.Label>Sort Order</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="sortOrder"
                                    value={values.sortOrder}
                                    onChange={handleChange}
                                >
                                    <option value="ASC">Ascending</option>
                                    <option value="DESC">Descending</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formFavoriteOrder" className="mb-3">
                                <Form.Label>Favorite Order</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="favoriteOrder"
                                    value={values.favoriteOrder}
                                    onChange={handleChange}
                                >
                                    <option value="ASC">Ascending</option>
                                    <option value="DESC">Descending</option>
                                </Form.Control>
                            </Form.Group>
                            <Button 
                                className='add-to-cart-btn w-100 text-light'
                                variant='warning'
                                type="submit">
                                Filter
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default Filter;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { fetchOrderList, fetchOrderDetailList, clearOrderDetails } from '../../store/orderSlice';
import { generateHistoryCSV, getPurchaseHistoryByUser, clearMessage, clearError, clearCsvData } from '../../store/historySlice';
import OrderList from '../OrderList/orderList';
import OrderDetails from '../OrderDetails/orderDetails';
import CsvDownloader from '../CsvDownloader/csvDownloader';

const Order = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userId);
    const userName = useSelector(state => state.user.username);
    const orders = useSelector(state => state.order.orders);
    const orderDetails = useSelector(state => state.order.orderDetails);
    const error = useSelector(state => state.order.error || state.history.error);
    const message = useSelector(state => state.history.message);
    const csvData = useSelector(state => state.history.csvData);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        if (userId) {
            dispatch(fetchOrderList(userId));
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

    const handleOrderClick = (orderId) => {
        setSelectedOrderId(orderId);
        dispatch(fetchOrderDetailList(orderId));
    };

    const handleBackToList = () => {
        setSelectedOrderId(null);
        dispatch(clearOrderDetails());
    };

    const handleGenerateCSV = async () => {
        await dispatch(generateHistoryCSV(userId));
        await dispatch(getPurchaseHistoryByUser(userId));
    };

    const handleDownloadComplete = () => {
        dispatch(clearCsvData());
    };

    return (
        <Container className="p-3 shadow-lg rounded" style={{ minWidth: '300px' }}>
            <h6 className="text-center">Orders</h6>
            <Row>
                <Col>
                    {!selectedOrderId ? (
                        <OrderList orders={orders} onOrderClick={handleOrderClick} onGenerateCSV={handleGenerateCSV} />
                    ) : (
                        <OrderDetails orderDetails={orderDetails} onBackToList={handleBackToList} selectedOrderId={selectedOrderId} />
                    )}
                </Col>
            </Row>
            {csvData && (
                <CsvDownloader
                    csvData={csvData}
                    fileName={`purchase_history_${userName}.csv`}
                    onDownloadComplete={handleDownloadComplete}
                />
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
        </Container>
    );
};

export default Order;

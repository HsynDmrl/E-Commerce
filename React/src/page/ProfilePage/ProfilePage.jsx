import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import ChangePassword from '../../component/ChangePassword/changePassword.jsx';
import { RiLockPasswordLine } from "react-icons/ri";
import { BsFillCalendar2CheckFill, BsFillCalendar2HeartFill } from "react-icons/bs";
import Order from '../../component/Order/order.jsx';
import Favorite from '../../component/Favorite/favorite.jsx';

const Menu = () => {
    const [activeTab, setActiveTab] = useState('order');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const renderDashboard = () => {
        switch (activeTab) {
            case 'order':
                return <Order />;
            case 'favorite':
                return <Favorite />;
            case 'changepassword':
                return <ChangePassword />;
            default:
                return null;
        }
    };

    return (
        <Container className="p-5 shadow-lg rounded mb-5" style={{ minWidth: '300px', marginTop: '70px' }}>
            <Row>
                <Col md={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Link
                            eventKey="order"
                            active={activeTab === 'order'}
                            onClick={() => handleTabChange('order')}
                            className="p-2 shadow-lg rounded d-flex align-items-center"
                        >
                            <BsFillCalendar2CheckFill style={{ color: 'orange', marginRight: '10px' }} /> Orders
                        </Nav.Link>
                        <Nav.Link
                            eventKey="favorite"
                            active={activeTab === 'favorite'}
                            onClick={() => handleTabChange('favorite')}
                            className="p-2 shadow-lg rounded d-flex align-items-center"
                        >
                            <BsFillCalendar2HeartFill style={{ color: 'orange', marginRight: '10px' }} /> Favorites
                        </Nav.Link>
                        <Nav.Link
                            eventKey="changepassword"
                            active={activeTab === 'changepassword'}
                            onClick={() => handleTabChange('changepassword')}
                            className="p-2 shadow-lg rounded d-flex align-items-center"
                        >
                            <RiLockPasswordLine style={{ color: 'orange', marginRight: '10px' }} /> Change Password
                        </Nav.Link>
                    </Nav>
                </Col>
                <Col md={9}>
                    <div className="dashboard-container">
                        {renderDashboard()}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Menu;

import React, { useState, useEffect, useRef } from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';
import Login from '../Login/login';
import ProfileDropdown from '../ProfileDropdown/profileDropDown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getBasketItems } from '../../store/basketSlice';
import Basket from '../Basket/basket';
import { FaShoppingBasket } from 'react-icons/fa';
import Badge from 'react-bootstrap/Badge';

function Navi() {
    const navigate = useNavigate();
    const homePage = () => { navigate('/') };
    const productPage = () => { navigate('/product') };

    const dispatch = useDispatch();

    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const basketItems = useSelector((state) => state.basket.basketItems);
    const userId = useSelector(state => state.user.userId);
    const userName = useSelector(state => state.user.username);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
        window.location.reload();
    };

    const [showBasket, setShowBasket] = useState(false);
    const basketRef = useRef(null);

    const handleBasketClick = () => {
        setShowBasket(!showBasket);
    };

    const handleClickOutside = (event) => {
        if (basketRef.current && !basketRef.current.contains(event.target)) {
            setShowBasket(false);
        }
    };

    useEffect(() => {
        if (showBasket) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showBasket]);

    useEffect(() => {
        if (userId) {
            dispatch(getBasketItems(userId));
        }
    }, [dispatch, userId]);

    return (
        <Navbar fixed="top" expand="lg" className="bg-warning text-light">
            <Container fluid className='col-8' style={{ maxWidth: "1100px" }}>
                <Navbar.Brand className="text-light">Agito Case</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link className="text-light" onClick={homePage}>Home</Nav.Link>
                        {isUserLoggedIn && (
                            <Nav.Link className="text-light" onClick={productPage}>Products</Nav.Link>
                        )}
                    </Nav>
                    {isUserLoggedIn && (
                        <div className="position-relative mx-3">
                            <FaShoppingBasket
                                style={{ cursor: 'pointer', position: 'relative', fontSize: '28px' }}
                                onClick={handleBasketClick}
                            />
                            <Badge pill bg="danger" style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)' }}>
                                {basketItems.length}
                            </Badge>
                            {showBasket && (
                                <div
                                    ref={basketRef}
                                    className="position-absolute bg-none rounded p-3"
                                    style={{ right: 0, top: '100%', zIndex: 1000 }}
                                >
                                    <Basket />
                                </div>
                            )}
                        </div>
                    )}
                    <NavDropdown
                        title={isUserLoggedIn ? `Welcome, ${userName}` : 'Login'}
                        className="w-auto"
                    >
                        {isUserLoggedIn ? (
                            <ProfileDropdown onLogout={handleLogout} />
                        ) : (
                            <Login />
                        )}
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navi;

import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login, clearError, clearMessage } from '../../store/userSlice'; 
import { Form, Alert, Button, Modal, ButtonGroup, InputGroup } from 'react-bootstrap';
import { BiShow, BiHide } from "react-icons/bi";
import Register from '../Register/register';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, message, isLoading, isLoggedIn } = useSelector((state) => state.user);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        return () => {
            dispatch(clearError());
            dispatch(clearMessage());
        };
    }, [dispatch]);

    const handleCloseRegisterModal = () => setShowRegisterModal(false);
    const handleShowRegisterModal = () => setShowRegisterModal(true);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: (values) => {
            dispatch(login(values));
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit} className="p-4 rounded bg-white" style={{ minWidth: '250px', maxWidth: '800px', margin: 'auto' }}>
            <h3 className="text-center mb-4">Login</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        isInvalid={formik.touched.username && formik.errors.username}
                        {...formik.getFieldProps("username")}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.username}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                    <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        isInvalid={formik.touched.password && formik.errors.password}
                        {...formik.getFieldProps("password")}
                    />
                    <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <BiHide /> : <BiShow />}
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <ButtonGroup className="d-flex justify-content-between mb-3">
                <Button variant="warning" type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
                <Button variant="success" onClick={handleShowRegisterModal}>
                    Register
                </Button>
            </ButtonGroup>

            <Modal show={showRegisterModal} onHide={handleCloseRegisterModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Register />
                </Modal.Body>
            </Modal>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
        </Form>
    );
}

export default Login;

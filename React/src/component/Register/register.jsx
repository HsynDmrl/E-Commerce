import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Form, Alert, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import userService from '../../service/userService';

const Register = () => {
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            setIsRegistering(true);
            setRegisterError(null);
            setSuccessMessage("");

            try {
                await userService.registerUser(values.username, values.password);
                setSuccessMessage("Registration successful! You can now log in.");
                formik.resetForm();
                setTimeout(() => navigate('/'), 3000);
            } catch (error) {
                setRegisterError(error.message);
            } finally {
                setIsRegistering(false);
            }
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit} className="p-4 shadow-sm rounded bg-white">
            <Form.Group className="mb-3" controlId="formBasicUsername">
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
                        type="password"
                        placeholder="Password"
                        isInvalid={formik.touched.password && formik.errors.password}
                        {...formik.getFieldProps("password")}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Button variant="success" type="submit" disabled={isRegistering} className="w-100">
                {isRegistering ? "Registering..." : "Register"}
            </Button>
            
            {registerError && <Alert variant="danger" className="mt-3">{registerError}</Alert>}
            {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
        </Form>
    );
}

export default Register;

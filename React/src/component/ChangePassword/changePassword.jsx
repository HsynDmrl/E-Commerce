import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { Form, Alert, Button, InputGroup } from 'react-bootstrap';
import { BiShow, BiHide } from "react-icons/bi";
import userService from '../../service/userService';

const ChangePassword = () => {
    const [changePasswordError, setChangePasswordError] = useState(null);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const userId = useSelector(state => state.user.userId);

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required("Current Password is required"),
            newPassword: Yup.string().required("New Password is required"),
        }),
        onSubmit: async (values) => {
            setIsChangingPassword(true);
            setChangePasswordError(null);
            setPasswordChangeSuccess("");

            try {
                await userService.changePassword(userId, values.currentPassword, values.newPassword);
                setPasswordChangeSuccess("Password changed successfully!");
                formik.resetForm();
            } catch (error) {
                setChangePasswordError(error.message);
            } finally {
                setIsChangingPassword(false);
            }
        },
    });

    return (
        <Form className="p-2 shadow-lg rounded" onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formCurrentPassword">
                <Form.Label>Current Password</Form.Label>
                <InputGroup>
                    <Form.Control
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        isInvalid={formik.touched.currentPassword && formik.errors.currentPassword}
                        {...formik.getFieldProps("currentPassword")}
                    />
                    <InputGroup.Text onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                        {showCurrentPassword ? <BiHide /> : <BiShow />}
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.currentPassword}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNewPassword">
                <Form.Label>New Password</Form.Label>
                <InputGroup>
                    <Form.Control
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        isInvalid={formik.touched.newPassword && formik.errors.newPassword}
                        {...formik.getFieldProps("newPassword")}
                    />
                    <InputGroup.Text onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? <BiHide /> : <BiShow />}
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.newPassword}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Button variant="warning" type="submit" className='text-light mb-3' disabled={isChangingPassword}>
                {isChangingPassword ? "Changing password..." : "Change"}
            </Button>
            
            {changePasswordError && <Alert variant="danger">{changePasswordError}</Alert>}
            {passwordChangeSuccess && <Alert variant="success">{passwordChangeSuccess}</Alert>}
        </Form>
    );
}

export default ChangePassword;

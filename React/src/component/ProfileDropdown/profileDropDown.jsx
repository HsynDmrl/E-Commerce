import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';


const ProfileDropdown = ({ onLogout }) => {
    return (
        <div>
            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={onLogout}>Log Out</NavDropdown.Item>
        </div>
    );
};

export default ProfileDropdown;

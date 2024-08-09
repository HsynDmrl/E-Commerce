import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-warning text-light py-4 footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </Col>
        </Row>
        <Row className="mt-3">
        <Row className="mt-3">
        <Col className="text-center">
            © 2024 Created by{' '}
            <a href="https://github.com/HsynDmrl" target="_blank" rel="noopener noreferrer" className="text-light">
              Hüseyin Demirel
            </a>. {' '} <Link to="/api" className="text-light">About Frontend</Link>.
          </Col>
        </Row>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

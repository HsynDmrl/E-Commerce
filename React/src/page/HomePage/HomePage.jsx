import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className='mb-5'style={{ marginTop: '70px' }}>
      <h1 className='text-center mb-4'>Welcome to the Shop</h1>

      <section className='mb-5'>
        <h2 className='text-center mb-4'>Categories</h2>
        <Row>
          <Col md={4}>
            <Card className='mb-4'>
              <Card.Body>
                <Card.Title>Category 1</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                </Card.Text>
                <Button variant="warning">Explore</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='mb-4'>
              <Card.Body>
                <Card.Title>Category 2</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                </Card.Text>
                <Button variant="warning">Explore</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='mb-4'>
              <Card.Body>
                <Card.Title>Category 3</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                </Card.Text>
                <Button variant="warning">Explore</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      <section className='mb-5'>
        <h2 className='text-center mb-4'>Featured Products</h2>
        <Row>
          <Col md={3}>
            <Card className='mb-4'>
              <Card.Body>
                <Card.Title>Product 1</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                </Card.Text>
                <Button variant="success">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className='mb-4'>
              <Card.Body>
                <Card.Title>Product 2</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                </Card.Text>
                <Button variant="success">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className='mb-4'>
              <Card.Body>
                <Card.Title>Product 3</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                </Card.Text>
                <Button variant="success">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className='mb-4'>
              <Card.Body>
                <Card.Title>Product 4</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                </Card.Text>
                <Button variant="success">Buy Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      <section className='text-center'>
        <h2 className='mb-4'>About Our Shop</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </section>
    </Container>
  );
}

export default HomePage;

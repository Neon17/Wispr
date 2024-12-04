import React from 'react';
import { 
   Nav, Container, Button, Row, 
    Col, Form 
  } from 'react-bootstrap';

const WisprFooter = () => {
    return (
        <footer className="bg-light py-4">
        <Container>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <h5 className="mb-3">Wispr</h5>
              <p className="text-muted">
                Transforming the way we communicate, one message at a time.
              </p>
            </Col>
            <Col md={2} className="mb-4 mb-md-0">
              <h6 className="mb-3">Product</h6>
              <Nav className="flex-column">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#security">Security</Nav.Link>
                <Nav.Link href="#team">Team</Nav.Link>
              </Nav>
            </Col>
            <Col md={2} className="mb-4 mb-md-0">
              <h6 className="mb-3">Company</h6>
              <Nav className="flex-column">
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#careers">Careers</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
              </Nav>
            </Col>
            <Col md={4}>
              <h6 className="mb-3">Stay Updated</h6>
              <Form className="d-flex">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="me-2"
                />
                <Button variant="primary">Subscribe</Button>
              </Form>
            </Col>
          </Row>
          <hr className="my-4" />
          <div className="text-center text-muted">
            © 2024 Wispr. All rights reserved.
          </div>
        </Container>
      </footer>
    );
};

export default WisprFooter;
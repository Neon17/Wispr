import React from 'react';
import { 
     Container, Button, Row, 
    Col, Form 
  } from 'react-bootstrap';
import  WisprLogo  from './WisprLogo';
const WisprHeroSection = () => {
    return (
        <section className="hero py-5 bg-gradient">
        <Container className="py-5 mt-5">
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start">
              <h1 className="display-4 fw-bold mb-4">
                Connect Better with Wispr
              </h1>
              <p className="lead mb-4">
                Experience chat reimagined. Secure, fast, and beautifully designed 
                for modern communication.
              </p>
              <Form className="d-flex gap-2 justify-content-center justify-content-lg-start mb-4">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="w-auto"
                />
                <Button variant="primary" size="lg">
                  Join Beta
                </Button>
              </Form>
            </Col>
            <Col lg={6} className="text-center">
              {/* <img 
                src="https://res.cloudinary.com/dk2uwbtnl/image/upload/v1634176824/wispr-app-interface_vzqz9v.png"
                alt="Wispr App Interface"
                className="img-fluid rounded-4 shadow-lg"
              /> */}
              <WisprLogo width="500" height="500" className="img-fluid rounded-4"/>
            </Col>
          </Row>
        </Container>
      </section>
    );
};

export default WisprHeroSection;
import React from 'react';
import { 
     Container, Button, 
   
  } from 'react-bootstrap';

const WisprCta = () => {
    return (
        <section className="cta bg-primary text-white py-5">
        <Container className="text-center py-4">
          <h2 className="mb-4">Ready to start chatting?</h2>
          <p className="lead mb-4">
            Join thousands of users already connecting through Wispr.
          </p>
          <Button variant="light" size="lg">
            Get Started Now
          </Button>
        </Container>
      </section>
    );
};

export default WisprCta;
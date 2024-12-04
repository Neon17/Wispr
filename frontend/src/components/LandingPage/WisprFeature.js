import React from 'react';
import { 
   Container,  Row, 
  Col, Card
} from 'react-bootstrap';
const WhisprFeature = () => {
    return (
              
      <section className="features py-5" id="features">
      <Container>
        <h2 className="text-center mb-5">Why Choose Wispr?</h2>
        <Row className="g-4">
          {[
            {
              title: "Real-time Messaging",
              description: "Experience instant message delivery with our cutting-edge infrastructure.",
              icon: "💬"
            },
            {
              title: "End-to-End Encryption",
              description: "Your conversations are protected with military-grade encryption.",
              icon: "🔒"
            },
            {
              title: "Smart Organization",
              description: "AI-powered chat organization keeps your conversations clean and relevant.",
              icon: "✨"
            }
          ].map((feature, index) => (
            <Col key={index} md={4}>
              <Card className="h-100 border-0 shadow-sm hover-card">
                <Card.Body className="text-center p-4">
                  <div className="feature-icon mb-3">
                    <span style={{ fontSize: '2rem' }}>{feature.icon}</span>
                  </div>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text>{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
    );
};

export default WhisprFeature;
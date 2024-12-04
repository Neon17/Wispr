import React from 'react';
import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { 
    Navbar, Nav, Container, Button
  } from 'react-bootstrap';
import WisprLogo from "./WisprLogo";
const WhisprNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
    return (
        <Navbar 
        expand="lg" 
        fixed="top" 
        className={`${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'} transition-all`}
      >
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            {/* <MessageSquare className="text-primary me-2" size={24} /> */}
            <span className="fw-bold">
              <WisprLogo width="50" height="50" />
              </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Button variant="primary" className="ms-3">Get Started</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    );
};

export default WhisprNav;
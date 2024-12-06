import React from 'react';
import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { 
    Navbar, Nav, Container, Button
  } from 'react-bootstrap';
import WisprLogo from "./WisprLogo";
const WhisprNav = () => {
  const [scrolled, setScrolled] = useState(false);

  const logout=()=>{
    localStorage.removeItem('token');
    return true;
  }

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
        className={`border-bottom ${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'} transition-all`}
      >
        <Container>
          <Navbar.Brand href="/home" className="d-flex align-items-center">
            {/* <MessageSquare className="text-primary me-2" size={24} /> */}
            <span className="fw-bold">
              <WisprLogo width="50" height="50" />
              </span>
              Start Messaging
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/features">Features</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              {localStorage.getItem('token')?
                <Nav.Link onClick={logout} href="/">Logout</Nav.Link>:
                <Nav.Link href="/auth">Login</Nav.Link>
              }
              <Button variant="primary" href='/' className="ms-3">Get Started</Button>
            </Nav>
          </Navbar.Collapse>
        </Container> 
      </Navbar>

    );
};

export default WhisprNav;
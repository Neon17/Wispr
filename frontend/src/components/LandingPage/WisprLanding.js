import React, { useState, useEffect } from 'react';
// import { MessageSquare } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Navbar, Nav, Container, Button, Row, 
  Col, Card, Form 
} from 'react-bootstrap';
import WisprHeroSection from "./WisprHeroSection.js";
import WisprFeatures from "./WisprFeature.js";
import WisprCta from "./WisprCta.js";
import WisprFooter from "./WisprFooter.js";

const WisprLanding = () => {
 
  return (
    <div className="wispr-app">


      {/* Hero Section */}
      <WisprHeroSection/>

      {/* Features Section */}
      <WisprFeatures/>

      {/* CTA Section */}
      <WisprCta/>

      {/* Footer */}
      <WisprFooter/>

      {/* Global Styles */}

      <style jsx='true'>{`
        .bg-gradient {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        
        .hover-card {
          transition: transform 0.3s ease;
        }
        
        .hover-card:hover {
          transform: translateY(-5px);
        }
        
        .feature-icon {
          background: linear-gradient(135deg, #007bff 0%, #6610f2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default WisprLanding;
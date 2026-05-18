"use client";
import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Menu, X, Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row className="mb-4">

          <Col md={3} className="mb-3">
          <div className="d-flex align-items-center gap-2">
  
                <div 
                  className="d-flex align-items-center justify-content-center rounded-circle bg-danger"
                  style={{ width: "32px", height: "32px", padding: "4px" }}
                >
                  <Heart fill="white" size={20} stroke="white" />
                </div>
              
            
              <span className="fw-bold fs-5 text-white " >BloodLink</span>
            </div>
            
           
            <p className="small">Connecting donors with those in need. Save lives, one donation at a time.</p>
          </Col>

          <Col md={3} className="mb-3">
            <h6 className="fw-bold mb-2">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a href="#home" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#about" className="text-light text-decoration-none">About</a></li>
              <li><a href="#features" className="text-light text-decoration-none">Features</a></li>
              <li><a href="#contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>

        
          <Col md={3} className="mb-3">
            <h6 className="fw-bold mb-2">Resources</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="text-light text-decoration-none">FAQ</a></li>
              <li><a href="#" className="text-light text-decoration-none">Blog</a></li>
              <li><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" className="text-light text-decoration-none">Terms of Service</a></li>
            </ul>
          </Col>


          <Col md={3} className="mb-3">
            <h6 className="fw-bold mb-2">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-danger"><Facebook size={20} /></a>
              <a href="#" className="text-danger"><Twitter size={20} /></a>
              <a href="#" className="text-danger"><Instagram size={20} /></a>
              <a href="#" className="text-danger"><Linkedin size={20} /></a>
            </div>
          </Col>
        </Row>

   
        <hr className="border-light" />
        <Row className="text-center text-md-start">
          <Col md={6}>
            <p className="small mb-0">&copy; {currentYear} BloodLink. All rights reserved.</p>
          </Col>
          
        </Row>
      </Container>
    </footer>
  );
}

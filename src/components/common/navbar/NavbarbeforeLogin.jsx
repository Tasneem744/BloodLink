"use client";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BloodLinkGif from "../../../assets/images/blood-ezgif.com-crop.gif";

export default function NavbarbeforeLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { to: "home", label: "Home" },
    { to: "about", label: "Why Donate" },
    { to: "eligibility", label: "Eligibility" },
    { to: "stats", label: "Statistics" },
    { to: "features", label: "How It Works" },
    { to: "stories", label: "Stories" },
    { to: "contact", label: "Contact" },
  ];

  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      navLinks.forEach((link) => {
        const section = document.getElementById(link.to);
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPos >= top && scrollPos <= bottom) {
            setActiveSection(link.to);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleScrollToSection = (id) => {

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          const offset = 70;
          const top = section.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 300);
    } else {

      const section = document.getElementById(id);
      if (section) {
        const offset = 70;
        const top = section.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <Navbar
      expand="lg"
      bg="white"
      fixed="top"
      className="border-bottom shadow-sm"
      style={{ minHeight: "60px" }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold d-flex align-items-center gap-2"
          onClick={() => handleScrollToSection("hero")}
        >
          <div className="p-1 rounded-circle d-flex align-items-center justify-content-center">
            <img
              src={BloodLinkGif}
              alt="Blood Donation"
              style={{ width: "50px" }}
            />
          </div>
          <span className="text-dark fw-bold fs-5">BloodLink</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav">
          <Menu size={24} />
        </Navbar.Toggle>

        <Navbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="text-center w-100 d-lg-flex align-items-center justify-content-center">
            {navLinks.map((link) => (
              <span
                key={link.to}
                onClick={() => handleScrollToSection(link.to)}
                className={`mx-2 fw-semibold nav-link ${
                  activeSection === link.to ? "text-danger" : "text-dark"
                }`}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
              </span>
            ))}


            <div className="d-lg-none mt-3">
              <Button
                as={Link}
                to="/login"
                variant="link"
                className="text-danger fw-semibold w-100 mb-2"
                style={{ textDecoration: "none" }}
              >
                Login
              </Button>
              <Button
                as={Link}
                to="/register"
                variant="danger"
                className="w-100"
                style={{ borderRadius: "50px" }}
              >
                Register
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>

        <Nav className="d-none d-lg-flex align-items-center gap-2">
          <Button
            as={Link}
            to="/login"
            variant="link"
            className="text-danger p-0 fw-semibold"
            style={{ textDecoration: "none" }}
          >
            Login
          </Button>
          <Button
            as={Link}
            to="/register"
            variant="danger"
            style={{ borderRadius: "50px" }}
          >
            Register
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

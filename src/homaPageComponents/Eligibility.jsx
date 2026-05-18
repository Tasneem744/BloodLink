import { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Heart, Droplet, Shield, Zap } from "lucide-react";

function DonationEligibility() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      if (sectionRef.current && sectionRef.current.getBoundingClientRect().top < window.innerHeight - 150) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const requirements = [
    { text: "18–65 years old", icon: "👤" },
    { text: "Weight ≥50kg", icon: "⚖️" },
    { text: "Good health", icon: "✓" },
    { text: "Normal hemoglobin level", icon: "🩸" },
  ];

  const icons = [
    { Icon: Heart, label: "Age", desc: "Must be between 18-65 years" },
    { Icon: Droplet, label: "Weight", desc: "Minimum 50kg required" },
    { Icon: Shield, label: "Health", desc: "Good overall health status" },
    { Icon: Zap, label: "Hemoglobin", desc: "Normal levels required" },
  ];

  return (
    <section
      id="eligibility"
      ref={sectionRef}
      className="py-5"
      style={{
        background: "linear-gradient(to bottom, white, #ffe4ec, white)",
      }}
    >
      <Container className="px-3 px-md-4">
        <div
          className="text-center mb-5"
          style={{
            transition: "0.8s",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h2 className="display-4 fw-bold">Who Can Donate?</h2>
          <p className="fs-5 text-muted">
            Learn the basic requirements to become a donor and save lives.
          </p>
        </div>

        <Row className="align-items-center">
          <Col xs={12} md={6} className="mb-4 mb-md-0"> 
            <Card
              className="rounded-4 p-4 border-0 shadow-sm"
              style={{
                border: "1px solid #ffa7c6",
                transition: "0.8s",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0.95)",
              }}
            >
              <h4 className="d-flex align-items-center fw-bold mb-0">
                <div
                  className="me-2 rounded-1"
                  style={{
                    width: "6px",
                    height: "35px",
                    background: "linear-gradient(to bottom, #d91b3c, #ff4c77)",
                  }}
                />
                Basic Requirements
              </h4>

              <ul className="mt-4 ps-0 mb-0">
                {requirements.map((req, i) => (
                  <li
                    key={i}
                    className="d-flex align-items-center mb-4"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "scale(1)" : "scale(0.95)",
                      transition: `${0.6 + i * 0.1}s`,
                    }}
                  >
                    <div
                      className="d-flex justify-content-center align-items-center me-3 rounded-circle"
                      style={{
                        width: "42px",
                        height: "42px",
                        background: "#ffe3eb",
                        fontSize: "20px",
                      }}
                    >
                      {req.icon}
                    </div>
                    <span className="fs-5 fw-medium">{req.text}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <Row>
              {icons.map((item, i) => {
                const Icon = item.Icon;
                return (
                  <Col xs={6} key={i} className="mb-3"> 
                    <Card
                      className="rounded-3 text-center p-3 border-0"
                      style={{
                        border: "1px solid #ffc7d9",
                        background: "#fff8fb",
                        transition: "0.3s",
                        cursor: "pointer",
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "scale(1)" : "scale(0.9)",
                        transitionDelay: `${0.5 + i * 0.1}s`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        className="mx-auto mb-3 d-flex justify-content-center align-items-center rounded-3"
                        style={{
                          width: "55px",
                          height: "55px",
                          background: "linear-gradient(to bottom right,#d91738,#ff6587)",
                        }}
                      >
                        <Icon color="white" size={26} />
                      </div>
                      <Card.Title className="fw-bold mb-2 fs-6">{item.label}</Card.Title>
                      <Card.Text className="text-muted small mb-0">{item.desc}</Card.Text>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default DonationEligibility;

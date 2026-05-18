import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function About() {
  return (
    <section id="about" className="py-5 bg-white">
      <Container fluid="lg" className="px-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6 text-dark mb-3">
            Why Blood Donation Matters
          </h2>
          <p
            className="fs-5 mx-auto"
            style={{ maxWidth: "650px", color: "#4B5563" }}
          >
            Blood donation is a simple yet powerful way to make a real difference
            in people's lives.
          </p>
        </div>

        <Row className="align-items-start gy-4">
         
          <Col md={6} className="pt-3">
            <div className="mb-4">
              <h3 className="fw-bold text-dark mb-2 border-start border-danger border-4 ps-3">
                Our Mission
              </h3>
              <p style={{ color: "#374151", lineHeight: "1.7", fontSize: "1rem" }}>
                To create a reliable, accessible blood donation network that
                connects generous donors with those in critical need. We believe
                every drop counts.
              </p>
            </div>

            <div>
              <h3 className="fw-bold text-dark mb-2 border-start border-danger border-4 ps-3">
                Our Vision
              </h3>
              <p style={{ color: "#374151", lineHeight: "1.7", fontSize: "1rem" }}>
                A world where no one suffers from blood shortage. Through
                technology and community, we're building a sustainable blood
                donation ecosystem.
              </p>
            </div>
          </Col>

         
          <Col md={6}>
            {[
              { title: "1 Donation", text: "Can save up to 3 lives" },
              { title: "Every 2 Seconds", text: "Someone needs blood transfusion" },
              { title: "Only 5%", text: "Of eligible population donates blood" },
            ].map((item, i) => (
              <Card
                key={i}
                className="mb-3 border-0 shadow-sm"
                style={{
                  backgroundColor: "#fff5f5",
                  borderLeft: "10px solid #dc3545",
                  borderRadius: "12px",
                  padding: "0.6rem 1rem",
                }}
              >
                <Card.Body className="py-2 px-3">
                  <h5 className="fw-bold text-dark mb-1" style={{ fontSize: "1.1rem" ,}}>
                    {item.title}
                  </h5>
                  <p style={{ color: "#4B5563", fontSize: "0.95rem", marginBottom: 0 }}>
                    {item.text}
                  </p>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;